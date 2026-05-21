import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@knitstudio/core": path.resolve(__dirname, "../core/src"),
      "@knitstudio/canvas": path.resolve(__dirname, "../canvas/src"),
      "@knitstudio/ui": path.resolve(__dirname, "../ui/src"),
      "@knitstudio/registry": path.resolve(__dirname, "../registry/src"),
      "@knitstudio/monitoring": path.resolve(__dirname, "../monitoring/src"),
      "@knitstudio/ai": path.resolve(__dirname, "../ai/src"),
      "@knitstudio/import": path.resolve(__dirname, "../import/src"),
      "@knitstudio/export": path.resolve(__dirname, "../export/src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "grapesjs-core": ["grapesjs"],
        },
      },
    },
  },
});
