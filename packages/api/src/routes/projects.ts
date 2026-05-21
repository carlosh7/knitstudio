import { Router } from "express";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { query } from "../db";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const projectRoutes = Router();

projectRoutes.get("/", async (_req, res) => {
  try {
    const result = await query("SELECT * FROM projects ORDER BY created_at DESC");
    res.json({ projects: result.rows });
  } catch {
    res.json({ projects: [] });
  }
});

projectRoutes.post("/", async (req, res) => {
  const { name, type } = req.body;
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  try {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    await query(
      "INSERT INTO projects (id, name, type, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
      [id, name, type || "web", now, now]
    );
    const result = await query("SELECT * FROM projects WHERE id = $1", [id]);
    res.status(201).json({ project: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to create project" });
  }
});

projectRoutes.post("/save", async (req, res) => {
  const { projectId, layout } = req.body;
  if (!projectId) {
    res.status(400).json({ error: "projectId required" });
    return;
  }
  try {
    const existing = await query("SELECT id FROM pages WHERE project_id = $1 LIMIT 1", [projectId]);
    const now = new Date().toISOString();
    if (existing.rows.length > 0) {
      await query(
        "UPDATE pages SET layout_json = $1, updated_at = $2 WHERE project_id = $3",
        [layout || "{}", now, projectId]
      );
    } else {
      await query(
        "INSERT INTO pages (id, project_id, route, title, layout_json, mode) VALUES ($1, $2, $3, $4, $5, 'db')",
        [crypto.randomUUID(), projectId, "/", "Page", layout || "{}"]
      );
    }
    await query("UPDATE projects SET updated_at = $1 WHERE id = $2", [now, projectId]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "save failed" });
  }
});

projectRoutes.get("/:id", async (req, res) => {
  try {
    const result = await query("SELECT * FROM projects WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "project not found" });
      return;
    }
    res.json({ project: result.rows[0] });
  } catch {
    res.status(500).json({ error: "failed to get project" });
  }
});

projectRoutes.delete("/:id", async (req, res) => {
  try {
    await query("DELETE FROM projects WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "failed to delete project" });
  }
});
