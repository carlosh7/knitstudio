import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  // E2E requires: pnpm build && pnpm --filter @knitstudio/builder preview
  webServer: process.env.CI
    ? {
        command: "pnpm build && pnpm --filter @knitstudio/builder preview --port 4173",
        url: "http://localhost:4173",
        reuseExistingServer: true,
        timeout: 60000,
      }
    : undefined,
});
