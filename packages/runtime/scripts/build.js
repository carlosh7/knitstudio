import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/runtime.ts"],
  outfile: "dist/runtime.js",
  format: "esm",
  bundle: true,
  minify: false,
  target: "es2020",
});

await esbuild.build({
  entryPoints: ["src/runtime.ts"],
  outfile: "dist/runtime.min.js",
  format: "iife",
  globalName: "KnitRuntime",
  bundle: true,
  minify: true,
  target: "es2020",
});

await esbuild.build({
  entryPoints: ["src/runtime.ts"],
  outfile: "dist/runtime.cjs",
  format: "cjs",
  bundle: true,
  minify: false,
  target: "es2020",
});

const { readFileSync } = await import("fs");
const size = (readFileSync("dist/runtime.min.js").length / 1024).toFixed(1);
console.log(`Runtime built: ${size}KB gzip target`);
