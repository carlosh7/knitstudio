import { describe, it, expect, vi, afterEach } from "vitest";
import { uuid } from "../uuid";

describe("uuid", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return a string", () => {
    const result = uuid();
    expect(typeof result).toBe("string");
  });

  it("should generate a valid UUID format", () => {
    const result = uuid();
    // basic regex for checking UUID v4 format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(result).toMatch(uuidRegex);
  });

  it("should generate unique values", () => {
    const set = new Set();
    for (let i = 0; i < 1000; i++) {
      set.add(uuid());
    }
    expect(set.size).toBe(1000); // Expecting 1000 unique ids
  });

  it("should handle environment without crypto gracefully (fallback)", () => {
    // we mock the global crypto completely by setting it to undefined temporarily
    const originalCrypto = global.crypto;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global.crypto;

    const result = uuid();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(result).toMatch(uuidRegex);

    expect(typeof result).toBe("string");

    // restore the original object
    global.crypto = originalCrypto;
  });
});
