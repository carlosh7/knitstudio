#!/usr/bin/env node
// i18n Full Automation Script
// Step 1: Extract all hardcoded strings, generate en.ts, update all .tsx files
// Step 2: Generate translation files for 8 languages
// Run: node scripts/i18n-full.js

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "packages", "builder", "src");

// ─── Step 1: Extract all hardcoded strings ───

const tsxFiles = [];

function collectFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== "dist" && entry.name !== "i18n" && entry.name !== "store" && entry.name !== "help" && entry.name !== "__tests__") {
        collectFiles(full);
      }
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      if (!entry.name.includes(".test.") && entry.name !== "registerSW.ts" && entry.name !== "vite-env.d.ts") {
        tsxFiles.push(full);
      }
    }
  }
}

collectFiles(SRC);

// Extract strings from JSX text nodes and attributes
const allStrings = new Map(); // key -> { text, file, line }

for (const file of tsxFiles) {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Pattern 1: >Visible Text< in JSX
    const textMatch = line.match(/>([A-Z][A-Za-z0-9_\-.,!?/@#$%^&*() ]{1,60})</);
    if (textMatch) {
      const text = textMatch[1].trim();
      if (text.length > 1 && !text.startsWith("{") && !text.startsWith("/") && !text.startsWith("?")) {
        const key = text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40);
        if (!allStrings.has(key)) {
          allStrings.set(key, { text, files: [{ file: relative(ROOT, file), line: i + 1 }] });
        } else {
          const existing = allStrings.get(key);
          if (!existing.files.some((f) => f.file === relative(ROOT, file))) {
            existing.files.push({ file: relative(ROOT, file), line: i + 1 });
          }
        }
      }
    }

    // Pattern 2: placeholder="Text"
    const phMatch = line.match(/placeholder="([A-Z][A-Za-z0-9_\-.,!?/@#$%^&*() ]{3,60})"/);
    if (phMatch) {
      const text = phMatch[1];
      const key = text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40);
      if (!allStrings.has(key)) {
        allStrings.set(key, { text, files: [{ file: relative(ROOT, file), line: i + 1 }] });
      }
    }

    // Pattern 3: title="Text"
    const titleMatch = line.match(/title="([A-Za-z][A-Za-z0-9_\-.,!?/@#$%^&*() ]{3,80})"/);
    if (titleMatch) {
      const text = titleMatch[1];
      if (text.includes("{") || text.includes("}")) continue;
      const key = text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40);
      if (!allStrings.has(key)) {
        allStrings.set(key, { text, files: [{ file: relative(ROOT, file), line: i + 1 }] });
      }
    }
  }
}

console.log(`Found ${allStrings.size} unique strings across ${tsxFiles.length} files\n`);

// ─── Step 2: Generate en.ts ───

let enOutput = "const messages = {\n";
for (const [key, val] of allStrings) {
  const escaped = val.text.replace(/"/g, '\\"');
  enOutput += `  "${key}": "${escaped}",\n`;
}
enOutput += "};\n\nexport type MessageKey = keyof typeof messages;\nexport default messages;\n";

writeFileSync(join(SRC, "i18n", "en.ts"), enOutput);
console.log("✅ en.ts generated with " + allStrings.size + " keys");

// ─── Step 3: Generate stub translation files ───

const targetLangs = {
  es: "Español", fr: "Français", de: "Deutsch", it: "Italiano",
  pt: "Português", zh: "中文", ja: "日本語", ko: "한국어"
};

for (const [lang, langName] of Object.entries(targetLangs)) {
  let output = "const messages = {\n";
  for (const [key, val] of allStrings) {
    const fallback = lang === "es" ? val.text : val.text;
    const escaped = fallback.replace(/"/g, '\\"');
    output += `  "${key}": "${escaped}",\n`;
  }
  output += "};\n\nexport type MessageKey = keyof typeof messages;\nexport default messages;\n";
  writeFileSync(join(SRC, "i18n", `${lang}.ts`), output);
  console.log(`✅ ${lang}.ts generated (${allStrings.size} keys, English fallback — needs real translation)`);
}

// ─── Step 4: Show which files need updating ───

console.log("\n📋 Files needing t() updates:");
for (const file of tsxFiles) {
  const content = readFileSync(file, "utf-8");
  const tCount = (content.match(/\bt\(\s*"/g) || []).length;
  const relPath = relative(ROOT, file);
  if (tCount === 0 && !relPath.includes("i18n") && !relPath.includes("store") && !relPath.includes("help/helpData")) {
    console.log(`  ⚠️  ${relPath} — 0 t() calls`);
  }
}

console.log("\n✅ Done. Next: run node scripts/i18n-translate.js to add real translations");
