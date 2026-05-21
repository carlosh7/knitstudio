import { useState } from "react";
import { getAllComponents } from "@knitstudio/registry";

function stylesToString(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${v}`)
    .join("; ");
}

export function ComponentSandbox() {
  const [selectedType, setSelectedType] = useState<string>("button");
  const [props, setProps] = useState<Record<string, unknown>>({});
  const all = getAllComponents();
  const selected = all.find((c) => c.type === selectedType);

  const updateProp = (name: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  const currentProps = selected?.props.reduce<Record<string, unknown>>((acc, p) => {
    acc[p.name] = props[p.name] ?? p.default;
    return acc;
  }, {}) ?? {};

  const styleStr = selected ? stylesToString(selected.defaultStyles || {}) : "";

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left: component list */}
      <div className="w-1/3 border-r border-knit-border p-3 overflow-y-auto">
        <h3 className="text-white text-sm font-medium mb-3">Components</h3>
        <div className="space-y-1">
          {all.map((c) => (
            <button
              key={c.type}
              onClick={() => { setSelectedType(c.type); setProps({}); }}
              className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${selectedType === c.type ? "bg-knit-primary text-white" : "text-knit-text hover:bg-knit-bg-hover"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Center: preview */}
      <div className="w-2/5 p-3 flex items-center justify-center overflow-auto bg-knit-bg">
        {selected && (
          <div
            className="pointer-events-none"
            style={{ ...(selected.defaultStyles || {}), ...(currentProps as Record<string, string>) }}
          >
            <div style={{ [styleStr ? "cssText" : ""]: styleStr }} dangerouslySetInnerHTML={{ __html: currentProps.content as string || currentProps.text as string || selected.name }} />
          </div>
        )}
        {!selected && <div className="text-knit-text-muted text-sm">Select a component</div>}
      </div>

      {/* Right: props */}
      <div className="w-1/4 border-l border-knit-border p-3 overflow-y-auto">
        <h3 className="text-white text-sm font-medium mb-3">Props</h3>
        {selected?.props.map((prop) => (
          <div key={prop.name} className="mb-3">
            <label className="text-xs text-knit-text-muted block mb-1">{prop.label}</label>
            {prop.type === "select" ? (
              <select
                value={String(currentProps[prop.name] ?? "")}
                onChange={(e) => updateProp(prop.name, e.target.value)}
                className="w-full px-2 py-1 bg-knit-bg border border-knit-border rounded text-xs text-white"
              >
                {prop.options?.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : prop.type === "boolean" ? (
              <input
                type="checkbox"
                checked={Boolean(currentProps[prop.name])}
                onChange={(e) => updateProp(prop.name, e.target.checked)}
                className="accent-knit-primary"
              />
            ) : (
              <input
                value={String(currentProps[prop.name] ?? "")}
                onChange={(e) => updateProp(prop.name, e.target.value)}
                className="w-full px-2 py-1 bg-knit-bg border border-knit-border rounded text-xs text-white"
              />
            )}
          </div>
        ))}
        {selected?.props.length === 0 && <div className="text-xs text-knit-text-muted">No props for this component</div>}
      </div>
    </div>
  );
}
