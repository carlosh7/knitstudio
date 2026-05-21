import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { projectRoutes } from "./routes/projects";
import { authRoutes } from "./routes/auth";

const __dirname = dirname(fileURLToPath(import.meta.url));
import { globalLimiter, authLimiter, projectsLimiter, exportLimiter,
  aiLimiter, importLimiter, feedbackLimiter, saveLimiter,
} from "./middleware/rateLimit";
import { query } from "./db";

export function createApp() {
  const app = express();

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "blob:"],
          connectSrc: ["'self'", process.env.CORS_ORIGIN || "http://localhost:3000"],
          frameAncestors: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }));

  app.use(express.json({ limit: "10mb" }));
  app.use(cookieParser());

  // Granular rate limiting (19 groups)
  app.use("/api/", globalLimiter);
  app.use("/api/auth/", authLimiter);
  app.use("/api/projects", projectsLimiter);
  app.use("/api/projects/save", saveLimiter);
  app.use("/api/export/", exportLimiter);
  app.use("/api/ai/", aiLimiter);
  app.use("/api/import/", importLimiter);
  app.use("/api/feedback", feedbackLimiter);

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", version: "1.0.0", uptime: process.uptime() });
  });

  // Serve bridge.js for external project injection
  app.get("/bridge.js", (_req, res) => {
    try {
      const bridgePath = join(__dirname, "..", "..", "bridge", "dist", "index.js");
      const content = readFileSync(bridgePath, "utf-8");
      res.setHeader("Content-Type", "application/javascript");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(content);
    } catch {
      res.status(404).json({ error: "bridge.js not built yet. Run pnpm --filter @knitstudio/bridge build" });
    }
  });

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/projects", projectRoutes);

  // Export endpoint: return HTML+CSS for a project page
  app.get("/api/export/:projectId", async (req, res) => {
    const { projectId } = req.params;
    const format = req.query.format || "html";
    try {
      const { rows } = await query("SELECT layout_json FROM pages WHERE project_id = $1 LIMIT 1", [projectId]);
      if (rows.length === 0) {
        res.status(404).json({ error: "no pages found for project" });
        return;
      }
      const layout = typeof rows[0].layout_json === "string" ? JSON.parse(rows[0].layout_json) : rows[0].layout_json;
      res.json({ html: layout?.html || "", css: layout?.css || "", format });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "export failed" });
    }
  });

  return app;
}
