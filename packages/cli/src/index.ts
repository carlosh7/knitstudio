#!/usr/bin/env node
import { Command } from "commander";
import { execSync, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createServer } from "node:http";

const program = new Command();

program
  .name("knit")
  .description("knitstudio — Visual Application Builder CLI")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize a new knitstudio project in the current directory")
  .argument("[name]", "Project name")
  .action((name?: string) => {
    const dir = name || "my-knitstudio-app";
    if (!existsSync(dir)) {
      execSync(`mkdir -p "${dir}"`, { stdio: "inherit" });
    }
    execSync("git init", { cwd: dir, stdio: "inherit" });
    console.log(`🧶 Initialized knitstudio project in ./${dir}`);
    console.log("   Run 'knit dev' to start the development server");
  });

program
  .command("dev")
  .description("Start the development server")
  .option("-p, --port <port>", "Port to run on", "3000")
  .action((options) => {
    const port = options.port;
    console.log(`🧶 Starting knitstudio dev server on port ${port}...`);

    const builder = spawn("pnpm", ["--filter", "@knitstudio/builder", "dev"], {
      stdio: "inherit",
      env: { ...process.env, PORT: String(port) },
    });

    const api = spawn("pnpm", ["--filter", "@knitstudio/api", "dev"], {
      stdio: "inherit",
      env: { ...process.env, PORT: "3001" },
    });

    process.on("SIGINT", () => {
      builder.kill();
      api.kill();
      process.exit(0);
    });
  });

program
  .command("build")
  .description("Build the project for production")
  .option("--out <dir>", "Output directory", "./dist")
  .action((options) => {
    console.log(`🧶 Building knitstudio project...`);
    execSync("pnpm build", { stdio: "inherit" });
    execSync(`mkdir -p "${options.out}"`, { stdio: "inherit" });
    execSync(`cp -r packages/builder/dist/* "${options.out}/"`, { stdio: "inherit" });
    console.log(`✅ Build complete. Output in ${options.out}/`);
  });

program
  .command("export")
  .description("Export a project to HTML")
  .option("-p, --project <id>", "Project ID")
  .option("-o, --out <file>", "Output file", "./export.html")
  .option("-f, --format <format>", "Export format: html | react", "html")
  .action(async (options) => {
    const projectId = options.project;
    if (!projectId) {
      console.error("❌ --project is required");
      process.exit(1);
    }
    try {
      const res = await fetch(`http://localhost:3001/api/export/${projectId}?format=${options.format}`);
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const { html, css } = await res.json();
      const { writeFileSync } = await import("node:fs");

      if (options.format === "react") {
        const { exportToReact, exportToHTML } = await import("@knitstudio/export");
        const schema = { $schema: { version: "1.0.0", targets: ["web"], meta: { name: projectId } }, theme: {}, variables: {}, templates: {}, pages: [] };
        const code = exportToReact(schema);
        writeFileSync(options.out.replace(/\.\w+$/, ".tsx"), code, "utf-8");
      } else {
        const fullHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${projectId}</title><style>${css || ""}</style></head><body>${html || ""}</body></html>`;
        writeFileSync(options.out, fullHtml, "utf-8");
      }
      console.log(`✅ Exported project ${projectId} to ${options.out}`);
    } catch (err) {
      console.error("❌ Export failed:", err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program
  .command("project:register")
  .description("Register an existing project")
  .requiredOption("--name <name>", "Project name")
  .option("--type <type>", "Project type", "web")
  .action(async (options) => {
    try {
      const res = await fetch("http://localhost:3001/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: options.name, type: options.type }),
      });
      const data = await res.json();
      console.log(`✅ Registered project "${data.project.name}" (ID: ${data.project.id})`);
    } catch {
      console.error("❌ Registration failed. Is the API running?");
      process.exit(1);
    }
  });

program
  .command("health")
  .description("Check if knitstudio API is healthy")
  .action(async () => {
    try {
      const res = await fetch("http://localhost:3001/api/health");
      const data = await res.json();
      console.log(`✅ knitstudio API is healthy (v${data.version}, uptime: ${Math.floor(data.uptime)}s)`);
    } catch {
      console.error("❌ knitstudio API is not reachable on port 3001");
      process.exit(1);
    }
  });

program.parse(process.argv);
