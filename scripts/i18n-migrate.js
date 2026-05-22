#!/usr/bin/env node
// i18n migration: Replace hardcoded strings with t() calls
// Uses existing en.ts keys to map strings → keys

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "packages", "builder", "src");

// Load existing en.ts keys
const enContent = readFileSync(join(SRC, "i18n", "en.ts"), "utf-8");
const keyRegex = /"([^"]+)":\s*"([^"]*)"/g;
const textToKey = new Map(); // text → key
let m;
while ((m = keyRegex.exec(enContent)) !== null) {
  textToKey.set(m[2].toLowerCase().trim(), m[1]);
}

// Collect all tsx/ts files
const tsxFiles = [];
function collect(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!["node_modules", "dist", "i18n", "__tests__", "store", "help"].includes(entry.name)) {
        collect(full);
      }
    } else if ((entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) && !entry.name.includes(".test.")) {
      tsxFiles.push(full);
    }
  }
}
collect(SRC);

let totalReplacements = 0;
let filesUpdated = 0;

for (const file of tsxFiles) {
  let content = readFileSync(file, "utf-8");
  const relPath = relative(ROOT, file);
  let modified = false;

  // Already has useI18n? If not, skip for now (add import manually)
  if (!content.includes("useI18n")) continue;

  let newContent = content;

  // Pattern 1: >Text< in JSX
  newContent = newContent.replace(/>([A-Z][A-Za-z0-9_\-.,!?/@#$%^&*() ]{2,50})</g, (match, text) => {
    const trimmed = text.trim();
    const key = textToKey.get(trimmed.toLowerCase());
    if (key && key.length > 0) {
      modified = true;
      totalReplacements++;
      return `>{t("${key}")}<`;
    }
    return match;
  });

  // Pattern 2: title="Text"
  newContent = newContent.replace(/title="([^"]{3,80})"/g, (match, text) => {
    const key = textToKey.get(text.toLowerCase());
    if (key && key.length > 0 && !text.includes("{") && !text.includes("}")) {
      modified = true;
      totalReplacements++;
      return `title={t("${key}")}`;
    }
    return match;
  });

  // Pattern 3: placeholder="Text"
  newContent = newContent.replace(/placeholder="([^"]{3,80})"/g, (match, text) => {
    const key = textToKey.get(text.toLowerCase());
    if (key && key.length > 0) {
      modified = true;
      totalReplacements++;
      return `placeholder={t("${key}")}`;
    }
    return match;
  });

  if (modified) {
    writeFileSync(file, newContent);
    filesUpdated++;
    console.log(`  ✅ ${relPath} — ${(newContent.match(/\bt\(\s*"/g) || []).length} t() calls`);
  }
}

console.log(`\n📊 ${filesUpdated} files updated, ${totalReplacements} replacements made`);