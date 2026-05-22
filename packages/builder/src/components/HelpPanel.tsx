import { useState, useMemo } from "react";
import { getHelpItems, getGettingStartedSteps } from "../help/helpData";
import { useI18n } from "../i18n";

interface HelpPanelProps {
  onClose: () => void;
}

export function HelpPanel({ onClose }: HelpPanelProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | "getting-started">("all");

  const helpItems = useMemo(() => getHelpItems(t), [t]);
  const steps = useMemo(() => getGettingStartedSteps(t), [t]);

  const results = query
    ? helpItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : helpItems;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-knit-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-knit-text font-semibold text-lg">{t("help.title")}</h2>
            <button onClick={onClose} className="text-knit-text-muted hover:text-knit-text text-xl">×</button>
          </div>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("help.search_placeholder")}
            className="w-full px-3 py-2 bg-knit-bg border border-knit-border rounded-lg text-sm text-knit-text placeholder-knit-text-muted focus:outline-none focus:border-knit-primary"
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => { setTab("all"); setQuery(""); }}
              className={`px-3 py-1 text-xs rounded-md ${tab === "all" ? "bg-knit-primary text-white" : "bg-knit-bg text-knit-text-muted hover:text-knit-text"}`}
            >
              {t("help.all_topics")} ({helpItems.length})
            </button>
            <button
              onClick={() => { setTab("getting-started"); setQuery(""); }}
              className={`px-3 py-1 text-xs rounded-md ${tab === "getting-started" ? "bg-knit-primary text-white" : "bg-knit-bg text-knit-text-muted hover:text-knit-text"}`}
            >
              🚀 {t("help.getting_started")} ({steps.length})
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {tab === "getting-started" && (
            <div className="space-y-2 mb-4">
              <div className="text-xs text-knit-text-muted mb-2">{t("help.steps")}:</div>
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-start gap-3 bg-knit-bg rounded-lg p-3 border border-knit-border">
                  <span className="text-lg shrink-0">{step.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-knit-primary text-white px-1.5 py-0.5 rounded-full">{i + 1}</span>
                      <span className="text-sm text-knit-text font-medium">{step.title}</span>
                    </div>
                    <p className="text-xs text-knit-text-muted mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "all" && (
            <div className="grid grid-cols-1 gap-2">
              {query && results.length === 0 && (
                <div className="text-center py-8 text-knit-text-muted text-sm">
                  {t("search.noresults")} "{query}"
                </div>
              )}
              {results.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 bg-knit-bg rounded-lg p-3 border border-knit-border hover:border-knit-primary/50 transition cursor-default"
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-sm text-knit-text font-medium">{item.title}</div>
                    <p className="text-xs text-knit-text-muted mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-knit-border space-y-2">
          <div className="flex gap-2">
            <a href="http://localhost:8001/" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-knit-primary text-white rounded-lg text-xs hover:bg-knit-primary-hover transition">
              📖 {t("help.footer_online")}
            </a>
            <a href="http://localhost:8001/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 px-3 py-2 bg-knit-bg text-knit-text-muted rounded-lg text-xs hover:text-knit-text hover:bg-knit-bg-hover transition border border-knit-border">
              📂 {t("help.footer_github")}
            </a>
          </div>
          <p className="text-xs text-knit-text-muted text-center">{t("help.footer_email")}</p>
        </div>
      </div>
    </div>
  );
}
