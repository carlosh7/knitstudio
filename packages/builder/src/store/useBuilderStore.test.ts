import { describe, it, expect } from "vitest";
import { useBuilderStore } from "./useBuilderStore";

describe("useBuilderStore", () => {
  it("starts in simple mode", () => {
    const state = useBuilderStore.getState();
    expect(state.mode).toBe("simple");
  });

  it("switches to advanced mode", () => {
    const { setMode } = useBuilderStore.getState();
    setMode("advanced");
    expect(useBuilderStore.getState().mode).toBe("advanced");
    setMode("simple");
  });

  it("toggles panel on/off", () => {
    const { setActivePanel } = useBuilderStore.getState();
    setActivePanel("blocks");
    expect(useBuilderStore.getState().activePanel).toBe("blocks");
    setActivePanel("blocks");
    expect(useBuilderStore.getState().activePanel).toBeNull();
  });
});
