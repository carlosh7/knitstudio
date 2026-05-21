import { useEffect, useState } from "react";
import { useBuilderStore } from "../store/useBuilderStore";
import { getAllComponents, type ComponentDefinition } from "@knitstudio/registry";
import "@knitstudio/registry"; // triggers all 35 component registrations

function stylesToString(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${v}`)
    .join(";");
}

export function BlocksPanel() {
  const editor = useBuilderStore((s) => s.editor);
  const [components, setComponents] = useState<ComponentDefinition[]>([]);

  useEffect(() => {
    setComponents(getAllComponents());
  }, []);

  useEffect(() => {
    if (!editor) return;
    for (const comp of getAllComponents()) {
      editor.Blocks.add(comp.type, {
        label: comp.name,
        content: `<div style="${stylesToString(comp.defaultStyles || {})}">${comp.name}</div>`,
        category: comp.category,
      });
    }
  }, [editor]);

  const categories = [...new Set(components.map((c) => c.category))];

  if (categories.length === 0) {
    return (
      <div className="text-knit-text-muted text-xs text-center py-8">
        No components loaded
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat}>
          <div className="text-xs font-semibold text-knit-text-muted uppercase tracking-wider mb-2">
            {cat} ({components.filter((c) => c.category === cat).length})
          </div>
          <div className="space-y-1">
            {components
              .filter((c) => c.category === cat)
              .map((comp) => (
                <div
                  key={comp.type}
                  draggable
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-knit-bg-hover cursor-grab active:cursor-grabbing text-sm text-knit-text transition"
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", comp.type);
                  }}
                >
                  <span>{comp.name}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
