function styleObjToString(styles) {
    return Object.entries(styles)
        .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${v}`)
        .join("; ");
}
function renderComponent(node) {
    const tag = getTagForType(node.type);
    const style = styleObjToString(node.styles?.base || {});
    const attrs = node.props
        ? Object.entries(node.props)
            .filter(([, v]) => typeof v === "string")
            .map(([k, v]) => `${k}="${v}"`)
            .join(" ")
        : "";
    const children = node.children?.map(renderComponent).join("\n") || node.props?.content || "";
    if (["text"].includes(node.type)) {
        return `<${tag} style="${style}" ${attrs}>${children}</${tag}>`;
    }
    return `<${tag} style="${style}" ${attrs}>\n${children}\n</${tag}>`;
}
function getTagForType(type) {
    const map = {
        container: "div",
        text: "p",
        button: "button",
        textinput: "input",
        form: "form",
        stack: "div",
        scrollview: "div",
        card: "div",
        icon: "span",
        divider: "hr",
        spacer: "div",
        navbar: "nav",
        footer: "footer",
        sidebar: "aside",
        pressable: "div",
        loading: "div",
        image: "img",
        select: "select",
        checkbox: "input",
        radiogroup: "div",
        table: "table",
        datalist: "div",
        formfield: "div",
        datepicker: "input",
        fileupload: "input",
        chart: "div",
        pagination: "nav",
        searchbar: "input",
        filterbar: "div",
        emptystate: "div",
        dataexport: "button",
        tabs: "div",
        accordion: "div",
        stepper: "div",
        timeline: "div",
    };
    return map[type] || "div";
}
export function exportToHTML(schema) {
    const pages = schema.pages.map((page) => {
        const body = renderComponent(page.root);
        return `<!-- Page: ${page.title} (${page.route}) -->\n${body}`;
    });
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${schema.$schema.meta?.name || "knitstudio export"}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f0f23; color: #e0e0e0; }
  </style>
</head>
<body>
${pages.join("\n\n")}
</body>
</html>`;
}
export function exportToReact(schema) {
    const pages = schema.pages.map((page) => {
        const body = renderComponent(page.root);
        return `export function ${page.title.replace(/\s+/g, "")}() {\n  return (\n${body.replace(/^/gm, "    ")}\n  );\n}`;
    });
    return `import React from "react";\n\n${pages.join("\n\n")}\n\nexport default function App() {\n  return <${schema.pages[0]?.title.replace(/\s+/g, "") || "Page"} />;\n}`;
}
//# sourceMappingURL=index.js.map