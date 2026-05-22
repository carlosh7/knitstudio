import { useI18n } from "../i18n";
import { useState } from "react";
import { useBuilderStore } from "../store/useBuilderStore";
import { useUIStore } from "../store/useUIStore";

export function SelfEditPanel() {
  const { t } = useI18n();
  const editor = useBuilderStore((s) => s.editor);
  const [mode, setMode] = useState<"off" | "shell">("off");
  const [shellLayout, setShellLayout] = useState<string>("");
  const addToast = useUIStore((s) => s.addToast);

  const toggleSelfEdit = () => {
    if (!editor) return;
    if (mode === "off") {
      // Capture current editor HTML as the shell layout
      const html = editor.getHtml();
      setShellLayout(html);
      setMode("shell");
      editor.setComponents(`<div style="padding:40px;text-align:center;color:#8899aa">Self-edit mode active. The builder UI is now editable.</div>`);
      addToast({ type: "info", message: "Self-edit mode ON — builder UI is editable" });
    } else {
      // Restore
      if (shellLayout) {
        editor.setComponents(shellLayout);
      }
      setMode("off");
      addToast({ type: "info", message: "Self-edit mode OFF" });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-sm font-medium">{t("selfedit.title")}</h3>
        <span className={`text-xs px-2 py-0.5 rounded ${mode === "off" ? "bg-knit-bg text-knit-text-muted" : "bg-purple-700 text-white"}`}>
          {mode === "off" ? "OFF" : "ACTIVE"}
        </span>
      </div>

      <p className="text-xs text-knit-text-muted">
        Self-edit mode lets you edit knitstudio's own interface. When active, the current UI layout
        becomes editable on the canvas — you can rearrange toolbars, panels, and buttons visually.
      </p>

      <button
        onClick={toggleSelfEdit}
        className={`w-full px-3 py-2 text-xs rounded-lg transition ${
          mode === "off"
            ? "bg-purple-700 text-white hover:bg-purple-600"
            : "bg-red-700 text-white hover:bg-red-600"
        }`}
      >
        {mode === "off" ? "🔮 Enter Self-Edit Mode" : "Exit Self-Edit Mode"}
      </button>
    </div>
  );
}
