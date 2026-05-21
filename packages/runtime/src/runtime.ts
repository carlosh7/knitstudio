// knitstudio Runtime — Embeddable <50KB gzip

type Styles = Record<string, string>;

export interface ComponentDef {
  type: string;
  tag: string;
  styles?: Styles;
  children?: ComponentDef[];
  props?: Record<string, unknown>;
}

const TAG_MAP: Record<string, string> = {
  container: "div", text: "p", button: "button", textinput: "input",
  form: "form", stack: "div", scrollview: "div", card: "div",
  icon: "span", divider: "hr", spacer: "div", navbar: "nav",
  footer: "footer", sidebar: "aside", image: "img", select: "select",
  checkbox: "input", radiogroup: "div", table: "table", datalist: "div",
  formfield: "div", datepicker: "input", fileupload: "input",
  chart: "div", pagination: "nav", searchbar: "input", filterbar: "div",
  emptystate: "div", dataexport: "button", tabs: "div", accordion: "div",
  stepper: "div", timeline: "div", pressable: "div", loading: "div",
};

function styleObjToString(styles: Styles): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(styles)) {
    parts.push(`${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${v}`);
  }
  return parts.join(";");
}

function renderNode(node: ComponentDef): HTMLElement | Text {
  const tag = TAG_MAP[node.type] || "div";
  const el = document.createElement(tag);

  if (node.styles) {
    el.setAttribute("style", styleObjToString(node.styles));
  }

  if (node.props) {
    for (const [k, v] of Object.entries(node.props)) {
      if (k === "content") {
        el.textContent = String(v);
      } else if (typeof v === "string") {
        el.setAttribute(k, v);
      }
    }
  }

  if (node.children) {
    for (const child of node.children) {
      el.appendChild(renderNode(child));
    }
  }

  return el;
}

export function render(container: HTMLElement, tree: ComponentDef): void {
  container.innerHTML = "";
  const el = renderNode(tree);
  container.appendChild(el);
}

export function renderHTML(tree: ComponentDef): string {
  const el = renderNode(tree);
  if (el instanceof Text) return el.textContent || "";
  return el.outerHTML;
}

// Auto-mount if data-knit attribute exists
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const mounts = document.querySelectorAll("[data-knit-runtime]");
    mounts.forEach((el) => {
      try {
        const data = JSON.parse(el.getAttribute("data-knit-data") || "{}");
        render(el as HTMLElement, data);
      } catch {
        // Silent fail on invalid data
      }
    });
  });
}
