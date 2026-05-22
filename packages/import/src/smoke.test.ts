import { describe, it, expect } from "vitest";

describe("@knitstudio/import", () => {
  it("importFromHTML produces valid schema", async () => {
    const { importFromHTML } = await import("./index");
    const schema = await importFromHTML("<div><p>Hello</p></div>");
    expect(schema.$schema.version).toBe("1.0.0");
    expect(schema.pages.length).toBe(1);
    expect(schema.pages[0].root.type).toBe("container");
  });

  it("importFromReact produces valid schema", async () => {
    const { importFromReact } = await import("./react");
    const schema = importFromReact("export default function Page() { return (<div><p>Hi</p></div>); }");
    expect(schema.pages.length).toBeGreaterThan(0);
  });
});
