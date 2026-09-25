import { describe, it, expect } from "vitest";
import { exportToHTML, exportToReact } from "../index";
import type { AppSchema } from "@knitstudio/core";

const mockSchema: AppSchema = {
  $schema: {
    version: "1.0",
    targets: ["web"],
    meta: { name: "Test App" }
  },
  theme: {},
  variables: {},
  templates: {},
  pages: [
    {
      id: "page-1",
      route: "/",
      title: "Home",
      root: {
        type: "container",
        key: "root-container",
        styles: {
          base: {
            backgroundColor: "red",
            color: "white"
          }
        },
        children: [
          {
            type: "text",
            key: "text-1",
            props: {
              content: "Hello World"
            }
          }
        ]
      }
    }
  ]
};

const emptySchema: AppSchema = {
  $schema: {
    version: "1.0",
    targets: ["web"]
  },
  theme: {},
  variables: {},
  templates: {},
  pages: []
};

describe("exportToHTML", () => {
  it("should generate HTML without pages properly", () => {
    const result = exportToHTML(emptySchema);
    expect(result).toContain("<!DOCTYPE html>");
    expect(result).toContain("knitstudio export"); // default title fallback
  });

  it("should generate HTML with components", () => {
    const result = exportToHTML(mockSchema);
    expect(result).toContain("<title>Test App</title>");
    expect(result).toContain("<!-- Page: Home (/) -->");
    // Check camelCase converted to kebab-case
    expect(result).toContain("background-color: red; color: white");
    expect(result).toContain("<div");
    // Text component should render as a p element with its text content
    expect(result).toContain("<p style=\"\" content=\"Hello World\">Hello World</p>");
  });
});

describe("exportToReact", () => {
  it("should generate React code without pages properly", () => {
    const result = exportToReact(emptySchema);
    expect(result).toContain("import React from \"react\";");
    expect(result).toContain("export default function App() {");
    expect(result).toContain("return <Page />");
  });

  it("should generate React code with components", () => {
    const result = exportToReact(mockSchema);
    expect(result).toContain("export function Home() {");
    expect(result).toContain("return <Home />");
    // Ensure styles are included
    expect(result).toContain("background-color: red; color: white");
    expect(result).toContain("<p style=\"\" content=\"Hello World\">Hello World</p>");
  });
});
