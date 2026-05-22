import { describe, it, expect } from "vitest";

describe("@knitstudio/runtime", () => {
  it("exports expected API", async () => {
    const runtime = await import("./runtime");
    expect(typeof runtime.render).toBe("function");
    expect(typeof runtime.renderHTML).toBe("function");
  });

  it("renderHTML returns a string", async () => {
    const { renderHTML } = await import("./runtime");
    const html = renderHTML({ type: "text", tag: "p", props: { content: "Hello" } });
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
