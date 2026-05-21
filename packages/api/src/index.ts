import { createServer } from "node:http";
import { createApp } from "./app";
import { runMigrations } from "./db";

const PORT = parseInt(process.env.PORT || "3001", 10);

async function main() {
  try {
    await runMigrations();
    console.log("[knitstudio/api] Database ready");
  } catch (err) {
    console.error("[knitstudio/api] Database migration failed, continuing without DB:", err);
  }

  const app = createApp();
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`[knitstudio/api] Server running on http://localhost:${PORT}`);
  });
}

main();
