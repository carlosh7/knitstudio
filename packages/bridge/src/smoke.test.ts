import { describe, it, expect } from "vitest";

describe("@knitstudio/bridge", () => {
  it("module shape is correct", async () => {
    const bridge = await import("./index");
    expect(typeof bridge.isValidOrigin).toBe("function");
    expect(typeof bridge.sendMessage).toBe("function");
    expect(typeof bridge.onMessage).toBe("function");
    expect(typeof bridge.setParentOrigin).toBe("function");
    expect(bridge.isValidOrigin("http://localhost:3000")).toBe(true);
    expect(bridge.isValidOrigin("https://evil.com")).toBe(false);
  });
});
