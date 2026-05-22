import { uuid } from "./uuid";
import type { AppSchema, ComponentNode } from "@knitstudio/core";

function parseHTML(html: string): ComponentNode {
  const div = document.createElement("div");
  div.innerHTML = html;
  return elementToNode(div);
}

function elementToNode(el: Element): ComponentNode {
  const tag = el.tagName.toLowerCase();
  const type = tagToComponentType(tag);
  const children: ComponentNode[] = [];

  for (const child of el.children) {
    children.push(elementToNode(child));
  }

  const styles: Record<string, string> = {};
  const styleAttr = el.getAttribute("style");
  if (styleAttr) {
    styleAttr.split(";").forEach((rule) => {
      const [k, v] = rule.split(":").map((s) => s.trim());
      if (k && v) {
        styles[camelCase(k)] = v;
      }
    });
  }

  const props: Record<string, unknown> = {};
  if (tag === "img") {
    props.src = el.getAttribute("src") || "";
    props.alt = el.getAttribute("alt") || "";
  }
  if (tag === "a") {
    props.href = el.getAttribute("href") || "";
  }
  if (el.textContent && children.length === 0) {
    props.content = el.textContent.trim();
  }

  return {
    type,
    key: `${type}-${uuid().slice(0, 8)}`,
    props: Object.keys(props).length > 0 ? props : undefined,
    styles: Object.keys(styles).length > 0 ? { base: styles } : undefined,
    children: children.length > 0 ? children : undefined,
  };
}

function tagToComponentType(tag: string): string {
  const map: Record<string, string> = {
    div: "container",
    p: "text",
    h1: "text",
    h2: "text",
    h3: "text",
    span: "text",
    button: "button",
    input: "textinput",
    form: "form",
    img: "image",
    nav: "navbar",
    footer: "footer",
    aside: "sidebar",
    hr: "divider",
    table: "table",
    select: "select",
  };
  return map[tag] || "container";
}

function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

export async function importFromHTML(html: string): Promise<AppSchema> {
  const root = parseHTML(html);

  return {
    $schema: {
      version: "1.0.0",
      targets: ["web"],
      meta: { name: "Imported from HTML" },
    },
    theme: {
      colors: {},
      breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 },
    },
    variables: {},
    templates: {},
    pages: [
      {
        id: uuid(),
        route: "/",
        title: "Imported Page",
        root,
      },
    ],
  };
}

export async function importFromURL(url: string): Promise<{ html: string; schema: AppSchema }> {
  const res = await fetch(url);
  const html = await res.text();
  const schema = await importFromHTML(html);
  return { html, schema };
}
