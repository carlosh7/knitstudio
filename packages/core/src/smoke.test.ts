import { describe, it, expect } from "vitest";

describe("@knitstudio/core", () => {
  it("loads without crashing", async () => {
    const mod = await import("./index");
    expect(mod).toBeDefined();
  });
});
