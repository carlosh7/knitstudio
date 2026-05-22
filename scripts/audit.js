#!/usr/bin/env node
// knitstudio Codebase Auditor
// Run: node scripts/audit.js

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

let errors = 0;
let warnings = 0;

function fail(category, msg) {
  errors++;
  console.log(`  ❌ [${category}] ${msg}`);
}

function warn(category, msg) {
  warnings++;
  console.log(`  ⚠️  [${category}] ${msg}`);
}

function pass(category, msg) {
  console.log(`  ✅ [${category}] ${msg}`);
}

// ─── 1. ORPHAN FILES: .js/.d.ts in src/ without source .ts/.tsx ───
function checkOrphanFiles() {
  console.log("\n📁 1. Archivos huérfanos (.js/.d.ts sin .ts fuente)\n");

  const packages = readdirSync(join(ROOT, "packages"));
  let found = 0;

  for (const pkg of packages) {
    const srcDir = join(ROOT, "packages", pkg, "src");
    if (!existsSync(srcDir)) continue;

    const files = readdirSync(srcDir, { recursive: true });
    const tsFiles = new Set(
      files.filter((f) => f.endsWith(".ts") || f.endsWith(".tsx")).map(normalizeExt)
    );

    for (const file of files) {
      if (!file.endsWith(".js") && !file.endsWith(".d.ts")) continue;
      const source = normalizeExt(file);
      if (!tsFiles.has(source) && !file.includes("node_modules")) {
        fail("ORPHAN", `${pkg}/src/${file} (sin .ts fuente)`);
        found++;
      }
    }
  }

  if (found === 0) pass("ORPHAN", "0 archivos huérfanos");
}

function normalizeExt(f) {
  return f.replace(/\.d\.ts$/, ".ts").replace(/\.js$/, ".ts").replace(/\.jsx$/, ".tsx");
}

// ─── 2. BROKEN IMPORTS: imports pointing to nonexistent files ───
function checkBrokenImports() {
  console.log("\n🔗 2. Imports rotos\n");

  const packages = readdirSync(join(ROOT, "packages"));
  let found = 0;

  for (const pkg of packages) {
    const srcDir = join(ROOT, "packages", pkg, "src");
    if (!existsSync(srcDir)) continue;

    const files = [];
    collectFiles(srcDir, files);

    for (const file of files) {
      if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
      const content = readFileSync(file, "utf-8");
      const localImports = content.match(/from\s+['"](\.[^'"]+)['"]/g) || [];

      for (const imp of localImports) {
        const path = imp.replace(/from\s+['"]/, "").replace(/['"]/, "");
        const base = dirname(file);
        const resolved = resolve(base, path);

        // Try extensions and index files
        const candidates = [
          resolved,
          resolved + ".ts",
          resolved + ".tsx",
          resolved + "/index.ts",
          resolved + "/index.tsx",
        ];

        const exists = candidates.some((c) => existsSync(c));
        if (!exists) {
          fail("BROKEN_IMPORT", `${relative(ROOT, file)} → ${path}`);
          found++;
        }
      }
    }
  }

  if (found === 0) pass("BROKEN_IMPORT", "0 imports rotos");
}

function collectFiles(dir, acc) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry !== "node_modules" && entry !== "dist") collectFiles(full, acc);
    } else {
      acc.push(full);
    }
  }
}

// ─── 3. UNUSED EXPORTS: functions exported but never imported ───
function checkUnusedExports() {
  console.log("\n📤 3. Exportaciones no usadas\n");

  const packages = readdirSync(join(ROOT, "packages"));
  let found = 0;

  for (const pkg of packages) {
    const srcDir = join(ROOT, "packages", pkg, "src");
    if (!existsSync(srcDir)) continue;

    const files = [];
    collectFiles(srcDir, files);

    for (const file of files) {
      if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
      const content = readFileSync(file, "utf-8");

      // Find exports
      const exportMatches = content.matchAll(
        /^export\s+(async\s+)?(function|const|class|default)\s+(\w+)/gm
      );

      for (const match of exportMatches) {
        const name = match[3];
        if (name === "default") continue;

        // Search in ALL packages except self
        let refs = 0;
        for (const searchPkg of packages) {
          const searchDir = join(ROOT, "packages", searchPkg, "src");
          if (!existsSync(searchDir)) continue;
          if (searchPkg === pkg) continue;

          const searchFiles = [];
          collectFiles(searchDir, searchFiles);

          for (const sf of searchFiles) {
            if (!sf.endsWith(".ts") && !sf.endsWith(".tsx")) continue;
            const sc = readFileSync(sf, "utf-8");
            // Count references as whole words
            const regex = new RegExp(`\\b${name}\\b`, "g");
            const count = (sc.match(regex) || []).length;
            refs += count;
          }
        }

        if (refs === 0) {
          warn("UNUSED", `${pkg} → ${name} (exportada de ${relative(ROOT, file)}, 0 referencias externas)`);
          found++;
        }
      }
    }
  }

  if (found === 0) pass("UNUSED", "0 exportaciones no usadas");
}

// ─── 4. PERSIST STORE KEY CONFLICTS ───
function checkStoreKeys() {
  console.log("\n🗝️  4. Conflictos de keys en stores persist\n");

  const builderDir = join(ROOT, "packages", "builder", "src", "store");
  if (!existsSync(builderDir)) {
    pass("STORE_KEYS", "directorio de stores no encontrado");
    return;
  }

  const keys = new Map();
  const files = readdirSync(builderDir).filter((f) => f.endsWith(".ts") && !f.includes(".test."));

  for (const file of files) {
    const content = readFileSync(join(builderDir, file), "utf-8");
    const match = content.match(/name:\s*['"]([^'"]+)['"]/);
    if (match) {
      const key = match[1];
      if (keys.has(key)) {
        fail("STORE_KEY_CONFLICT", `"${key}" usado en ${keys.get(key)} y ${file}`);
      } else {
        keys.set(key, file);
      }
    }
  }

  pass("STORE_KEYS", `${keys.size} stores, 0 conflictos de key`);
}

// ─── 5. PACKAGE VERSION CONSISTENCY ───
function checkVersions() {
  console.log("\n📦 5. Consistencia de versiones\n");

  const rootPkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8"));
  const rootVersion = rootPkg.version;

  let mismatches = 0;
  const packages = readdirSync(join(ROOT, "packages"));

  for (const pkg of packages) {
    const pkgPath = join(ROOT, "packages", pkg, "package.json");
    if (!existsSync(pkgPath)) continue;
    const data = JSON.parse(readFileSync(pkgPath, "utf-8"));
    if (data.version && data.version !== rootVersion) {
      fail("VERSION_MISMATCH", `${data.name} → ${data.version} (esperado ${rootVersion})`);
      mismatches++;
    }
  }

  if (mismatches === 0) pass("VERSIONS", `todas las packages en ${rootVersion}`);
}

// ─── 6. NON-EXISTENT PATH ALIASES ───
function checkAliases() {
  console.log("\n🔀 6. Path aliases rotos\n");

  // Check root tsconfig paths
  const tsconfig = JSON.parse(readFileSync(join(ROOT, "tsconfig.json"), "utf-8"));
  const paths = tsconfig.compilerOptions?.paths || {};
  let found = 0;

  for (const [key, targets] of Object.entries(paths)) {
    for (const target of targets) {
      const resolved = join(ROOT, target);
      if (!existsSync(resolved)) {
        fail("BROKEN_ALIAS", `${key} → ${target} (no existe)`);
        found++;
      }
    }
  }

  // Check vite aliases
  const viteConfig = readFileSync(join(ROOT, "packages", "builder", "vite.config.ts"), "utf-8");
  const viteAliases = viteConfig.match(/['"](@knitstudio\/[^'"]+)['"]\s*:\s*path\.resolve\([^)]+\)/g) || [];

  for (const alias of viteAliases) {
    const match = alias.match(/['"](@knitstudio\/[^'"]+)['"]/);
    if (match) {
      const key = match[1];
      if (!paths[key]) {
        warn("ALIAS_MISSING_IN_TSCONFIG", `${key} está en vite.config.ts pero no en tsconfig.json paths`);
      }
      // Check if the package exists
      const pkgName = key.replace("@knitstudio/", "");
      const pkgDir = join(ROOT, "packages", pkgName);
      if (!existsSync(pkgDir)) {
        fail("BROKEN_ALIAS", `${key} → packages/${pkgName}/ no existe`);
        found++;
      }
    }
  }

  if (found === 0) pass("ALIASES", "0 aliases rotos");
}

// ─── 7. DOCKERFILE HEALTH ───
function checkDockerfiles() {
  console.log("\n🐳 7. Dockerfiles\n");

  const dockerDir = join(ROOT, "docker");
  if (!existsSync(dockerDir)) {
    fail("DOCKER", "directorio docker/ no encontrado");
    return;
  }

  const files = readdirSync(dockerDir).filter((f) => f.endsWith(".Dockerfile") || f === "nginx.conf");
  if (files.length === 0) {
    fail("DOCKER", "no hay Dockerfiles");
    return;
  }

  for (const file of files) {
    const content = readFileSync(join(dockerDir, file), "utf-8");
    // Check for hardcoded secrets
    if (content.includes("password") && !content.includes("${")) {
      warn("DOCKER_SECRET", `${file} contiene passwords hardcodeados`);
    }
  }

  pass("DOCKER", `${files.length} archivos de Docker`);
}

// ─── 8. GIT HEALTH ───
function checkGit() {
  console.log("\n🔧 8. Estado Git\n");

  if (!existsSync(join(ROOT, ".git"))) {
    fail("GIT", "no hay repositorio git");
    return;
  }

  pass("GIT", "repositorio inicializado");
}

// ─── RUN ───
console.log("\n🧶 knitstudio Code Auditor");
console.log("════════════════════════\n");
console.log(`Root: ${ROOT}\n`);

checkOrphanFiles();
checkBrokenImports();
checkUnusedExports();
checkStoreKeys();
checkVersions();
checkAliases();
checkDockerfiles();
checkGit();

console.log("\n════════════════════════");
console.log(`📊 Resultados: ${errors} errores, ${warnings} advertencias\n`);

process.exit(errors > 0 ? 1 : 0);
