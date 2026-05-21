import { describe, it, expect } from "vitest";

describe("@knitstudio/runtime", () => {
  it("exports expected API", async () => {
    const runtime = await import("./runtime");
    expect(typeof runtime.render).toBe("function");
    expect(typeof runtime.renderHTML).toBe("function");
  });
});
