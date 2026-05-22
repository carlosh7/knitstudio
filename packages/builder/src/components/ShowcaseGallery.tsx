import { useI18n } from "../i18n";
import { useState } from "react";

const examples = [
  { name: "Landing Page", desc: "Hero section, features grid, CTA button", pages: 1, level: 1 },
  { name: "Dashboard", desc: "Sidebar, header, stats cards, data table", pages: 1, level: 2 },
  { name: "Auth + Dashboard", desc: "Login page + protected dashboard", pages: 2, level: 3 },
  { name: "Full Application", desc: "Landing, login, dashboard, settings", pages: 4, level: 4 },
  { name: "Contact Form", desc: "Form with validation, submit, confirmation", pages: 1, level: 1 },
  { name: "Blog Layout", desc: "Article list, categories sidebar, pagination", pages: 2, level: 2 },
  { name: "E-commerce", desc: "Product grid, cart, checkout flow", pages: 3, level: 3 },
  { name: "Admin Panel", desc: "Users table, roles, activity log, charts", pages: 3, level: 4 },
];

interface ShowcaseGalleryProps {
  onSelect: (name: string) => void;
  onClose: () => void;
}

export function ShowcaseGallery({ onSelect, onClose }: ShowcaseGalleryProps) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<number>(0);

  const filtered = filter === 0 ? examples : examples.filter((e) => e.level === filter);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-5 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-knit-text font-semibold">{t("showcase.title")}</h2>
          <button onClick={onClose} className="text-knit-text-muted hover:text-knit-text">×</button>
        </div>

        <p className="text-xs text-knit-text-muted mb-4">Get inspired by these example projects. Click any to use it as a starting point.</p>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setFilter(0)} className={`px-3 py-1 text-xs rounded-md ${filter === 0 ? "bg-knit-primary text-white" : "bg-knit-bg text-knit-text-muted"}`}>{t("showcase.filter_all")}</button>
          {[1, 2, 3, 4].map((l) => (
            <button key={l} onClick={() => setFilter(l)} className={`px-3 py-1 text-xs rounded-md ${filter === l ? "bg-knit-primary text-white" : "bg-knit-bg text-knit-text-muted"}`}>Level {l}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((ex) => (
            <button
              key={ex.name}
              onClick={() => onSelect(ex.name)}
              className="text-left p-4 rounded-lg border border-knit-border bg-knit-bg hover:border-knit-primary transition group"
            >
              <div className="text-sm text-white font-medium mb-1 group-hover:text-knit-primary">{ex.name}</div>
              <div className="text-xs text-knit-text-muted mb-2">{ex.desc}</div>
              <div className="flex gap-2">
                <span className="text-xs text-knit-text-muted">{ex.pages} page{ex.pages > 1 ? "s" : ""}</span>
                <span className="text-xs text-knit-text-muted">·</span>
                <span className="text-xs text-knit-primary">Level {ex.level}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
