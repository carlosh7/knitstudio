import { registerComponent } from "./registry";

// ── F1 Core (20) ──

registerComponent({ type: "container", name: "Container", category: "Layout", targets: ["web", "react"], props: [{ name: "direction", label: "Direction", type: "select", default: "column", options: [{ label: "Column", value: "column" }, { label: "Row", value: "row" }] }], defaultStyles: { display: "flex", flexDirection: "column", padding: "16px", minHeight: "60px", gap: "8px" } });

registerComponent({ type: "text", name: "Text", category: "Basic", targets: ["web", "react"], props: [{ name: "content", label: "Content", type: "string", default: "Enter text here" }, { name: "tag", label: "HTML Tag", type: "select", default: "p", options: [{ label: "Paragraph", value: "p" }, { label: "H1", value: "h1" }, { label: "H2", value: "h2" }, { label: "H3", value: "h3" }, { label: "Span", value: "span" }] }], defaultStyles: { fontSize: "16px", color: "#e0e0e0", margin: "0" } });

registerComponent({ type: "button", name: "Button", category: "Basic", targets: ["web", "react"], props: [{ name: "text", label: "Text", type: "string", default: "Click me" }, { name: "variant", label: "Variant", type: "select", default: "primary", options: [{ label: "Primary", value: "primary" }, { label: "Secondary", value: "secondary" }, { label: "Ghost", value: "ghost" }] }, { name: "disabled", label: "Disabled", type: "boolean", default: false }], defaultStyles: { background: "#4f46e5", color: "#fff", padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "14px" } });

registerComponent({ type: "textinput", name: "Text Input", category: "Form", targets: ["web", "react"], props: [{ name: "placeholder", label: "Placeholder", type: "string", default: "Enter text..." }, { name: "type", label: "Type", type: "select", default: "text", options: [{ label: "Text", value: "text" }, { label: "Password", value: "password" }, { label: "Email", value: "email" }, { label: "Number", value: "number" }] }], defaultStyles: { padding: "8px 12px", border: "1px solid #444", borderRadius: "6px", background: "#1a1a2e", color: "#fff", fontSize: "14px", width: "100%" } });

registerComponent({ type: "form", name: "Form", category: "Form", targets: ["web", "react"], props: [], defaultStyles: { display: "flex", flexDirection: "column", gap: "12px", padding: "20px", border: "1px solid #333", borderRadius: "8px" } });

registerComponent({ type: "stack", name: "Stack", category: "Layout", targets: ["web", "react"], props: [{ name: "direction", label: "Direction", type: "select", default: "column", options: [{ label: "Column", value: "column" }, { label: "Row", value: "row" }] }, { name: "gap", label: "Gap", type: "number", default: 8 }], defaultStyles: { display: "flex", gap: "8px" } });

registerComponent({ type: "scrollview", name: "Scroll View", category: "Layout", targets: ["web", "react"], props: [], defaultStyles: { overflow: "auto", maxHeight: "400px" } });

registerComponent({ type: "card", name: "Card", category: "Layout", targets: ["web", "react"], props: [], defaultStyles: { background: "#1a1a2e", borderRadius: "8px", padding: "20px", border: "1px solid #333" } });

registerComponent({ type: "icon", name: "Icon", category: "Basic", targets: ["web", "react"], props: [{ name: "icon", label: "Icon name", type: "string", default: "star" }, { name: "size", label: "Size", type: "number", default: 24 }], defaultStyles: { width: "24px", height: "24px" } });

registerComponent({ type: "divider", name: "Divider", category: "Basic", targets: ["web", "react"], props: [], defaultStyles: { height: "1px", background: "#333", margin: "16px 0", border: "none" } });

registerComponent({ type: "spacer", name: "Spacer", category: "Layout", targets: ["web", "react"], props: [{ name: "height", label: "Height", type: "number", default: 16 }], defaultStyles: { height: "16px" } });

registerComponent({ type: "navbar", name: "Navbar", category: "Navigation", targets: ["web"], props: [{ name: "brand", label: "Brand text", type: "string", default: "Brand" }], defaultStyles: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", background: "#1a1a2e", borderBottom: "1px solid #333" } });

registerComponent({ type: "footer", name: "Footer", category: "Navigation", targets: ["web"], props: [], defaultStyles: { padding: "24px", background: "#1a1a2e", borderTop: "1px solid #333", textAlign: "center", fontSize: "13px", color: "#8899aa" } });

registerComponent({ type: "sidebar", name: "Sidebar", category: "Navigation", targets: ["web"], props: [], defaultStyles: { width: "240px", background: "#16213e", borderRight: "1px solid #333", padding: "16px" } });

registerComponent({ type: "pressable", name: "Pressable", category: "Basic", targets: ["web", "react"], props: [], defaultStyles: { cursor: "pointer", transition: "opacity 0.2s" } });

registerComponent({ type: "loading", name: "Loading", category: "Feedback", targets: ["web", "react"], props: [{ name: "size", label: "Size", type: "select", default: "md", options: [{ label: "Small", value: "sm" }, { label: "Medium", value: "md" }, { label: "Large", value: "lg" }] }], defaultStyles: { display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" } });

registerComponent({ type: "image", name: "Image", category: "Media", targets: ["web", "react"], props: [{ name: "src", label: "Image URL", type: "string", default: "" }, { name: "alt", label: "Alt text", type: "string", default: "" }, { name: "objectFit", label: "Fit", type: "select", default: "cover", options: [{ label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] }], defaultStyles: { maxWidth: "100%", borderRadius: "4px" } });

registerComponent({ type: "select", name: "Select", category: "Form", targets: ["web", "react"], props: [{ name: "placeholder", label: "Placeholder", type: "string", default: "Select..." }, { name: "options", label: "Options", type: "string", default: "Option 1,Option 2,Option 3" }], defaultStyles: { padding: "8px 12px", border: "1px solid #444", borderRadius: "6px", background: "#1a1a2e", color: "#fff", fontSize: "14px", width: "100%" } });

registerComponent({ type: "checkbox", name: "Checkbox", category: "Form", targets: ["web", "react"], props: [{ name: "label", label: "Label", type: "string", default: "Check me" }, { name: "checked", label: "Checked", type: "boolean", default: false }], defaultStyles: { display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" } });

registerComponent({ type: "radiogroup", name: "Radio Group", category: "Form", targets: ["web", "react"], props: [{ name: "options", label: "Options", type: "string", default: "Option 1,Option 2,Option 3" }], defaultStyles: { display: "flex", flexDirection: "column", gap: "8px" } });

// ── F2 Data (15) ──

registerComponent({ type: "table", name: "Table", category: "Data", targets: ["web"], props: [{ name: "columns", label: "Columns", type: "string", default: "Name,Email,Role" }], defaultStyles: { width: "100%", borderCollapse: "collapse", fontSize: "14px" } });

registerComponent({ type: "datalist", name: "Data List", category: "Data", targets: ["web", "react"], props: [], defaultStyles: { display: "flex", flexDirection: "column", gap: "8px" } });

registerComponent({ type: "formfield", name: "Form Field", category: "Form", targets: ["web", "react"], props: [{ name: "label", label: "Label", type: "string", default: "Field" }, { name: "required", label: "Required", type: "boolean", default: false }], defaultStyles: { display: "flex", flexDirection: "column", gap: "4px" } });

registerComponent({ type: "datepicker", name: "Date Picker", category: "Form", targets: ["web"], props: [], defaultStyles: { padding: "8px 12px", border: "1px solid #444", borderRadius: "6px", background: "#1a1a2e", color: "#fff", fontSize: "14px" } });

registerComponent({ type: "fileupload", name: "File Upload", category: "Form", targets: ["web"], props: [{ name: "accept", label: "Accepted files", type: "string", default: "image/*" }], defaultStyles: { padding: "20px", border: "2px dashed #444", borderRadius: "8px", textAlign: "center", cursor: "pointer" } });

registerComponent({ type: "chart", name: "Chart", category: "Data", targets: ["web"], props: [{ name: "type", label: "Chart type", type: "select", default: "bar", options: [{ label: "Bar", value: "bar" }, { label: "Line", value: "line" }, { label: "Pie", value: "pie" }] }], defaultStyles: { width: "100%", height: "300px" } });

registerComponent({ type: "pagination", name: "Pagination", category: "Data", targets: ["web", "react"], props: [{ name: "total", label: "Total pages", type: "number", default: 5 }], defaultStyles: { display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "12px" } });

registerComponent({ type: "searchbar", name: "Search Bar", category: "Data", targets: ["web", "react"], props: [{ name: "placeholder", label: "Placeholder", type: "string", default: "Search..." }], defaultStyles: { padding: "8px 12px", border: "1px solid #444", borderRadius: "6px", background: "#1a1a2e", color: "#fff", fontSize: "14px", width: "100%" } });

registerComponent({ type: "filterbar", name: "Filter Bar", category: "Data", targets: ["web"], props: [], defaultStyles: { display: "flex", gap: "8px", padding: "8px 0", flexWrap: "wrap" } });

registerComponent({ type: "emptystate", name: "Empty State", category: "Feedback", targets: ["web", "react"], props: [{ name: "message", label: "Message", type: "string", default: "No data available" }], defaultStyles: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", color: "#8899aa", textAlign: "center" } });

registerComponent({ type: "dataexport", name: "Data Export", category: "Data", targets: ["web"], props: [{ name: "format", label: "Format", type: "select", default: "csv", options: [{ label: "CSV", value: "csv" }, { label: "Excel", value: "xlsx" }, { label: "JSON", value: "json" }] }], defaultStyles: { padding: "8px 16px", background: "#4f46e5", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "14px" } });

registerComponent({ type: "tabs", name: "Tabs", category: "Navigation", targets: ["web", "react"], props: [{ name: "tabs", label: "Tabs", type: "string", default: "Tab 1,Tab 2,Tab 3" }], defaultStyles: { display: "flex", borderBottom: "1px solid #333" } });

registerComponent({ type: "accordion", name: "Accordion", category: "Layout", targets: ["web", "react"], props: [{ name: "items", label: "Items", type: "string", default: "Section 1,Section 2,Section 3" }], defaultStyles: { display: "flex", flexDirection: "column", gap: "2px" } });

registerComponent({ type: "stepper", name: "Stepper", category: "Navigation", targets: ["web", "react"], props: [{ name: "steps", label: "Steps", type: "string", default: "Step 1,Step 2,Step 3" }, { name: "current", label: "Current step", type: "number", default: 1 }], defaultStyles: { display: "flex", alignItems: "center", gap: "8px", padding: "16px 0" } });

registerComponent({ type: "timeline", name: "Timeline", category: "Data", targets: ["web", "react"], props: [], defaultStyles: { display: "flex", flexDirection: "column", gap: "16px", padding: "16px 0" } });

export function registerAllComponents() {
  // All 35 components are auto-registered at import time
}
