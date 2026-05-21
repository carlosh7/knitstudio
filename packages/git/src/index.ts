import { execSync } from "node:child_process";
import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

export interface GitDiff {
  added: string[];
  removed: string[];
  modified: string[];
}

export function isGitRepo(dir: string): boolean {
  return existsSync(join(dir, ".git"));
}

export function initRepo(dir: string): void {
  execSync("git init", { cwd: dir });
  writeFileSync(join(dir, ".gitignore"), "node_modules/\ndist/\n.env\n", "utf-8");
}

export function stageAll(dir: string): void {
  execSync("git add -A", { cwd: dir });
}

export function commit(dir: string, message: string): void {
  execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { cwd: dir });
}

export function getDiff(dir: string): GitDiff {
  const output = execSync("git diff --name-status HEAD", { cwd: dir, encoding: "utf-8" });
  const diff: GitDiff = { added: [], removed: [], modified: [] };

  for (const line of output.trim().split("\n")) {
    if (!line) continue;
    const [status, file] = line.split("\t");
    if (status === "A") diff.added.push(file);
    else if (status === "D") diff.removed.push(file);
    else diff.modified.push(file);
  }

  return diff;
}

export function saveLayoutToRepo(dir: string, projectId: string, pageId: string, layout: unknown): void {
  const knitDir = join(dir, ".knitstudio");
  const pagesDir = join(knitDir, "pages");

  if (!existsSync(knitDir)) {
    execSync(`mkdir -p "${pagesDir}"`, { cwd: dir });
  }

  const filePath = join(pagesDir, `${pageId}.json`);
  writeFileSync(filePath, JSON.stringify(layout, null, 2), "utf-8");
}

export function readLayoutFromRepo(dir: string, pageId: string): unknown {
  const filePath = join(dir, ".knitstudio", "pages", `${pageId}.json`);
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, "utf-8"));
}
