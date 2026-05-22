import { uuid } from "./uuid";
import type { AppSchema, ComponentNode, PageDefinition } from "@knitstudio/core";

function jsxToComponent(jsx: string): ComponentNode {
  const tagMatch = jsx.match(/^<([A-Za-z][A-Za-z0-9]*)/);
  if (!tagMatch) {
    return { type: "text", key: "import-text", props: { content: jsx } };
  }

  const tag = tagMatch[1].toLowerCase();
  const typeMap: Record<string, string> = {
    div: "container", p: "text", span: "text", h1: "text", h2: "text", h3: "text",
    button: "button", input: "textinput", img: "image", form: "form",
    nav: "navbar", footer: "footer", table: "table", select: "select",
  };
  const type = typeMap[tag] || "container";

  const children: ComponentNode[] = [];
  const innerMatch = jsx.match(/>([\s\S]*)<\/[A-Za-z]/);
  if (innerMatch) {
    const inner = innerMatch[1].trim();
    if (inner && !inner.startsWith("<")) {
      children.push({ type: "text", key: "t", props: { content: inner } });
    }
  }

  return {
    type,
    key: `${type}-import`,
    children: children.length > 0 ? children : undefined,
  };
}

export function importFromReact(code: string): AppSchema {
  const pages: PageDefinition[] = [];

  const exportMatch = code.match(/export\s+default\s+function\s+(\w+)/);
  const funcName = exportMatch ? exportMatch[1] : "Page";

  const returnMatch = code.match(/return\s*\(([\s\S]*?)\)\s*;/);
  if (returnMatch) {
    pages.push({
      id: uuid(),
      route: "/",
      title: funcName,
      root: jsxToComponent(returnMatch[1].trim()),
    });
  }

  return {
    $schema: { version: "1.0.0", targets: ["react"], meta: { name: `Imported: ${funcName}` } },
    theme: { breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 } },
    variables: {},
    templates: {},
    pages: pages.length > 0 ? pages : [{ id: uuid(), route: "/", title: "Imported", root: { type: "container", key: "root" } }],
  };
}
