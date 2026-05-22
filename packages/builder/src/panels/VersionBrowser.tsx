import { uuid } from "../lib/uuid";
import { useI18n } from "../i18n";
import { useState } from "react";
import { useUIStore } from "../store/useUIStore";

interface Version {
  id: string;
  version: number;
  timestamp: string;
  author: string;
  message: string;
  data: unknown;
}

const sampleVersions: Version[] = [
  { id: "v1", version: 3, timestamp: "2026-05-20 14:30", author: "You", message: "Updated dashboard layout", data: null },
  { id: "v2", version: 2, timestamp: "2026-05-20 12:15", author: "You", message: "Added stats cards", data: null },
  { id: "v3", version: 1, timestamp: "2026-05-19 09:00", author: "System", message: "Initial page", data: null },
];

export function VersionBrowser() {
  const { t } = useI18n();
  const addToast = useUIStore((s) => s.addToast);
  const [versions, setVersions] = useState<Version[]>(sampleVersions);
  const [selected, setSelected] = useState<string | null>(null);
  const [showDiff, setShowDiff] = useState(false);

  const handleRollback = (id: string) => {
    setVersions((prev) => {
      const idx = prev.findIndex((v) => v.id === id);
      if (idx < 0) return prev;
      const target = prev[idx];
      return [
        {
          id: uuid(),
          version: prev[0].version + 1,
          timestamp: new Date().toLocaleString(),
          author: "You",
          message: `Rolled back to v${target.version}`,
          data: null,
        },
        ...prev,
      ];
    });
    addToast({ type: "success", message: "Rolled back successfully" });
    setSelected(null);
  };

  const toggleDiff = () => {
    setShowDiff(!showDiff);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-sm font-medium">{t("version.title")}</h3>
        <button onClick={toggleDiff} className={`px-2 py-1 text-xs rounded ${showDiff ? "bg-knit-primary text-white" : "bg-knit-bg text-knit-text-muted"}`}>
          {showDiff ? "Hide Diff" : "Show Diff"}
        </button>
      </div>

      {showDiff && (
        <div className="bg-knit-bg rounded-lg p-3 border border-knit-border font-mono text-xs">
          <div className="text-green-400">+ Added navbar component</div>
          <div className="text-red-400">- Removed old header</div>
          <div className="text-yellow-400">~ Changed button colors</div>
          <div className="text-knit-text-muted mt-1">Select two versions to compare</div>
        </div>
      )}

      <div className="space-y-2">
        {versions.map((v, i) => (
          <div
            key={v.id}
            onClick={() => setSelected(v.id === selected ? null : v.id)}
            className={`bg-knit-bg rounded-lg p-3 border cursor-pointer transition ${
              selected === v.id ? "border-knit-primary" : "border-knit-border"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-knit-bg-alt px-1.5 py-0.5 rounded text-knit-primary">v{v.version}</span>
                <span className="text-sm text-white">{v.message}</span>
              </div>
              <span className="text-xs text-knit-text-muted">{i === 0 ? "current" : v.timestamp}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-knit-text-muted">{v.author}</span>
              {selected === v.id && i > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleRollback(v.id); }}
                  className="px-2 py-0.5 text-xs bg-yellow-700 text-white rounded"
                >
                  Rollback to here
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
