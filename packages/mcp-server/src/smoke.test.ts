import { describe, it, expect } from "vitest";

describe("@knitstudio/mcp-server", () => {
  it("has valid package config", async () => {
    const pkg = await import("../package.json", { assert: { type: "json" } });
    expect(pkg.default.name).toBe("@knitstudio/mcp-server");
    expect(pkg.default.version).toBeDefined();
  });
});
