import { useI18n } from "../i18n";
import { useState } from "react";
import { getAllComponents } from "@knitstudio/registry";

function stylesToString(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${v}`)
    .join("; ");
}

export function ComponentSandbox() {
  const { t } = useI18n();
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
      {/* Left: component list — auto width, capped */}
      <div className="w-auto min-w-[140px] max-w-[220px] border-r border-knit-border p-3 overflow-y-auto shrink-0">
        <h3 className="text-knit-text text-sm font-medium mb-3">{t("panel.components")}</h3>
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

      {/* Center: preview — takes all remaining space */}
      <div className="flex-1 p-3 flex items-center justify-center overflow-auto bg-knit-bg min-w-0">
        {selected && (
          <div
            className="pointer-events-none"
            style={{ ...(selected.defaultStyles || {}), ...(currentProps as Record<string, string>) }}
          >
            <div style={{ [styleStr ? "cssText" : ""]: styleStr }} dangerouslySetInnerHTML={{ __html: currentProps.content as string || currentProps.text as string || selected.name }} />
          </div>
        )}
        {!selected && <div className="text-knit-text-muted text-sm">{t("select_component")}</div>}
      </div>

      {/* Right: props — auto width, capped */}
      <div className="w-auto min-w-[180px] max-w-[260px] border-l border-knit-border p-3 overflow-y-auto shrink-0">
        <h3 className="text-knit-text text-sm font-medium mb-3">{t("props")}</h3>
        {selected?.props.map((prop) => (
          <div key={prop.name} className="mb-3">
            <label className="text-xs text-knit-text-muted block mb-1">{prop.label}</label>
            {prop.type === "select" ? (
              <select
                value={String(currentProps[prop.name] ?? "")}
                onChange={(e) => updateProp(prop.name, e.target.value)}
                className="w-full px-2 py-1 bg-knit-input-bg border border-knit-border rounded text-xs text-knit-text"
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
                className="w-full px-2 py-1 bg-knit-input-bg border border-knit-border rounded text-xs text-knit-text"
              />
            )}
          </div>
        ))}
        {selected?.props.length === 0 && <div className="text-xs text-knit-text-muted">{t("no_props")}</div>}
      </div>
    </div>
  );
}
