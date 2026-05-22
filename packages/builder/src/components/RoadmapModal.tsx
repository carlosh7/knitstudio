import { useI18n } from "../i18n";
import { useUIStore } from "../store/useUIStore";

const phases = [
  { phase: "Fase 0", name: "Foundation", status: "✅" },
  { phase: "Fase 1", name: "Security Core", status: "✅" },
  { phase: "Fase 2", name: "UX Core + Amateur Mode", status: "✅" },
  { phase: "Fase 3", name: "Performance + a11y + i18n", status: "✅" },
  { phase: "Fase 4", name: "35 Componentes Core", status: "✅" },
  { phase: "Fase 5", name: "Action Flows + Import", status: "✅" },
  { phase: "Fase 6", name: "Export Engine + Preview", status: "✅" },
  { phase: "Fase 7", name: "AI + Git", status: "✅" },
  { phase: "Fase 8", name: "Self-Edit + MCP + Dashboard", status: "✅" },
  { phase: "Fase 9", name: "Docs + Enterprise", status: "✅" },
  { phase: "Post-MVP", name: "Colaboración, RN, SDK, Plugins", status: "🔲" },
];

export function RoadmapModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-5 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-knit-text font-semibold">{t("roadmap.title")}</h2>
          <button onClick={onClose} className="text-knit-text-muted hover:text-knit-text">×</button>
        </div>
        <div className="space-y-2">
          {phases.map((p) => (
            <div key={p.phase} className="flex items-center gap-3 py-1.5">
              <span className="text-sm">{p.status}</span>
              <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${p.status === "✅" ? "bg-green-900/50 text-green-300" : "bg-knit-bg text-knit-text-muted"}`}>{p.phase}</span>
              <span className="text-sm text-white">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
