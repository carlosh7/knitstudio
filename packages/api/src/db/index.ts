import pg from "pg";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://knitstudio:knitstudio@localhost:5432/knitstudio",
  max: 20,
  idleTimeoutMillis: 30000,
});

export async function runMigrations() {
  const migrationsDir = join(__dirname, "migrations");
  const files = readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!file.endsWith(".sql")) continue;
    const sql = readFileSync(join(migrationsDir, file), "utf-8");
    try {
      await pool.query(sql);
      console.log(`[db] Migration applied: ${file}`);
    } catch (err) {
      console.error(`[db] Migration failed: ${file}`, err);
      throw err;
    }
  }
}

export async function query(text: string, params?: unknown[]) {
  const result = await pool.query(text, params);
  return result;
}

export async function getClient() {
  const client = await pool.connect();
  return client;
}

export default pool;
