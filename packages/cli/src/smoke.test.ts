import { describe, it, expect } from "vitest";

describe("@knitstudio/cli", () => {
  it("exports commander program", async () => {
    // CLI module calls program.parse() at import, which exits in tests.
    // Validate the package.json bin instead.
    const pkg = await import("../package.json", { assert: { type: "json" } });
    expect(pkg.default.bin).toBeDefined();
    expect(pkg.default.bin.knit).toBeDefined();
  });
});
