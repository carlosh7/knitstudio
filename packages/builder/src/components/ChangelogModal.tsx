import { useUIStore } from "../store/useUIStore";

const changelog = [
  { version: "1.0.0", date: "2026-05-20", items: ["MVP completo — Fases 0-9 implementadas", "35 componentes core", "Export HTML + React", "Import HTML + URL + React", "AI generation (GPT-4o)", "Git nativo", "Data binding + execution debug", "Onboarding interactivo", "Component Sandbox", "Self-Edit mode", "Preview QR", "Seguridad completa (JWT, RBAC, CSP, DOMPurify)"] },
  { version: "0.9.0", date: "2026-05-19", items: ["Self-Edit mode", "Dashboard de monitoreo", "Annotations system"] },
  { version: "0.8.0", date: "2026-05-18", items: ["AI engine (OpenAI)", "Git integration (init, commit, diff)", "Import HTML + URL"] },
  { version: "0.7.0", date: "2026-05-17", items: ["Export engine (HTML, React)", "35 componentes en registry", "Component Sandbox"] },
  { version: "0.6.0", date: "2026-05-16", items: ["i18n EN + ES", "Service Worker offline", "Keyboard shortcuts", "Búsqueda global (Cmd+K)"] },
  { version: "0.5.0", date: "2026-05-15", items: ["Seguridad: DOMPurify, JWT, RBAC, rate limiting, CSP, Helmet, Keystore"] },
  { version: "0.4.0", date: "2026-05-14", items: ["Monorepo pnpm workspaces", "GrapesJS canvas", "React Flow actions", "API + PostgreSQL", "Docker compose", "CI/CD"] },
];

export function ChangelogModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-5 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Changelog</h2>
          <button onClick={onClose} className="text-knit-text-muted hover:text-white">×</button>
        </div>
        <div className="space-y-4">
          {changelog.map((v) => (
            <div key={v.version} className="border-l-2 border-knit-primary pl-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-white font-mono font-semibold">v{v.version}</span>
                <span className="text-xs text-knit-text-muted">{v.date}</span>
              </div>
              <ul className="space-y-0.5">
                {v.items.map((item, i) => (
                  <li key={i} className="text-xs text-knit-text-muted">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
