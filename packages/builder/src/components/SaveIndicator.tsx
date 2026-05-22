import { useI18n } from "../i18n";
import { useUIStore } from "../store/useUIStore";

export function SaveIndicator() {
  const { t } = useI18n();
  const indicator = useUIStore((s) => s.saveIndicator);

  const indicators = {
    saved: { label: t("editor.save.success"), color: "text-green-400", icon: "✓" },
    saving: { label: t("editor.autosave"), color: "text-yellow-400", icon: "⏳" },
    unsaved: { label: "Unsaved", color: "text-orange-400", icon: "●" },
    error: { label: t("editor.save.error"), color: "text-red-400", icon: "✕" },
  };

  const { label, color, icon } = indicators[indicator];

  return (
    <span className={`flex items-center gap-1 text-xs ${color}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}
