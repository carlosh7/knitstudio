import { useI18n } from "../i18n";
import { useState } from "react";
import { getTemplatesByLevel } from "../templates";
import type { Template } from "../templates";

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
  onClose: () => void;
}

export function TemplateSelector({ onSelect, onClose }: TemplateSelectorProps) {
  const { t } = useI18n();
  const [level, setLevel] = useState<number>(3);
  const available = getTemplatesByLevel(level);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-5 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-knit-text font-semibold">{t("template.title")}</h2>
          <button onClick={onClose} className="text-knit-text-muted hover:text-knit-text">×</button>
        </div>

        {/* Level selector */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-3 py-1 text-xs rounded-md transition ${
                level === l ? "bg-knit-primary text-white" : "bg-knit-bg text-knit-text-muted hover:text-knit-text"
              }`}
            >
              Level {l}
            </button>
          ))}
          <div className="text-xs text-knit-text-muted ml-2 self-center">
            {level === 1 ? "Simple page" : level === 5 ? "Full app + auth + DB" : "More features"}
          </div>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 gap-3">
          {available.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelect(t)}
              className="text-left p-3 rounded-lg border border-knit-border hover:border-knit-primary bg-knit-bg transition group"
            >
              <div className="text-sm text-white font-medium mb-1 group-hover:text-knit-primary transition">
                {t.name}
              </div>
              <div className="text-xs text-knit-text-muted">{t.description}</div>
              <div className="text-xs text-knit-primary mt-1">
                Level {t.level} · {t.layout.pages.length} page{t.layout.pages.length > 1 ? "s" : ""}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
