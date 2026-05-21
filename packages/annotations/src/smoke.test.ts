import { describe, it, expect } from "vitest";

describe("@knitstudio/annotations", () => {
  it("loads without crashing", async () => {
    const mod = await import("./index");
    expect(mod).toBeDefined();
  });
});
