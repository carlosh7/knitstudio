import { useI18n } from "../i18n";
import { useState, useEffect } from "react";
import { useGridStore } from "../store/useGridStore";

export function GridSettingsModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const snapToGrid = useGridStore((s) => s.snapToGrid);
  const gridSize = useGridStore((s) => s.gridSize);
  const showGrid = useGridStore((s) => s.showGrid);
  const toggleSnap = useGridStore((s) => s.toggleSnap);
  const setGridSize = useGridStore((s) => s.setGridSize);
  const setShowGrid = useGridStore((s) => s.setShowGrid);
  const [localSize, setLocalSize] = useState(gridSize);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-5 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-knit-text font-semibold mb-4">{t("grid.title")}</h2>

        <label className="flex items-center justify-between mb-3 text-sm">
          <span className="text-knit-text">{t("grid.snap")}</span>
          <input type="checkbox" checked={snapToGrid} onChange={toggleSnap} className="accent-knit-primary" />
        </label>

        <label className="flex items-center justify-between mb-3 text-sm">
          <span className="text-knit-text">{t("grid.show")}</span>
          <input type="checkbox" checked={showGrid} onChange={() => setShowGrid(!showGrid)} className="accent-knit-primary" />
        </label>

        <div className="mb-4">
          <div className="text-sm text-knit-text mb-1">Grid size: {localSize}px</div>
          <div className="flex gap-2">
            {[4, 8, 12, 16, 24].map((s) => (
              <button
                key={s}
                onClick={() => { setLocalSize(s); setGridSize(s); }}
                className={`px-3 py-1 text-xs rounded-md transition ${
                  localSize === s ? "bg-knit-primary text-white" : "bg-knit-bg text-knit-text-muted hover:text-knit-text"
                }`}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>

        <button onClick={onClose} className="w-full py-1.5 bg-knit-primary text-white rounded-lg text-sm">{t("grid.done")}</button>
      </div>
    </div>
  );
}
