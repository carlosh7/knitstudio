import { useI18n } from "../i18n";
import { useState } from "react";
import { useUIStore } from "../store/useUIStore";

export function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const addToast = useUIStore((s) => s.addToast);
  const [apiKey, setApiKey] = useState(localStorage.getItem("knitstudio-openai-key") || "");

  const handleSave = () => {
    localStorage.setItem("knitstudio-openai-key", apiKey);
    onClose();
    addToast({ type: "success", message: "API key saved" });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-5 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">{t("settings.title")}</h2>
          <button onClick={onClose} className="text-knit-text-muted hover:text-white">×</button>
        </div>

        <div className="mb-4">
          <label className="text-sm text-knit-text block mb-1">{t("settings.api_key")}</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-3 py-2 bg-knit-bg border border-knit-border rounded-lg text-sm text-white placeholder-knit-text-muted focus:outline-none focus:border-knit-primary"
          />
          <p className="text-xs text-knit-text-muted mt-1">Your key is stored locally and never sent to our servers.</p>
        </div>

        <div className="mb-4">
          <label className="text-sm text-knit-text block mb-1">{t("settings.import_title")}</label>
          <input
            type="url"
            id="import-url"
            placeholder="https://example.com"
            className="w-full px-3 py-2 bg-knit-bg border border-knit-border rounded-lg text-sm text-white placeholder-knit-text-muted focus:outline-none focus:border-knit-primary"
          />
          <button
            onClick={async () => {
              const url = (document.getElementById("import-url") as HTMLInputElement)?.value;
              if (!url) return;
              try {
                const { importFromURL } = await import("@knitstudio/import");
                const result = await importFromURL(url);
                addToast({ type: "success", message: `Imported "${result.schema.pages[0]?.title || "Untitled"}" (${result.html.length.toLocaleString()} bytes)` });
              } catch {
                addToast({ type: "error", message: "Import failed — check URL and CORS" });
              }
            }}
            className="mt-2 px-3 py-1 text-xs bg-knit-primary text-white rounded-lg"
          >
            Import
          </button>
        </div>

        <button onClick={handleSave} className="w-full py-1.5 bg-knit-primary text-white rounded-lg text-sm">{t("data.save")}</button>
      </div>
    </div>
  );
}
