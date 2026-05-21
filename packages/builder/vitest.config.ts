import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@knitstudio/ui": path.resolve(__dirname, "../ui/src"),
      "@knitstudio/canvas": path.resolve(__dirname, "../canvas/src"),
      "@knitstudio/core": path.resolve(__dirname, "../core/src"),
      "@knitstudio/registry": path.resolve(__dirname, "../registry/src"),
      "@knitstudio/monitoring": path.resolve(__dirname, "../monitoring/src"),
      "@knitstudio/ai": path.resolve(__dirname, "../ai/src"),
      "@knitstudio/import": path.resolve(__dirname, "../import/src"),
      "@knitstudio/export": path.resolve(__dirname, "../export/src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
