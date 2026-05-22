import { useI18n } from "../i18n";
import { useThemeStore } from "../store/useThemeStore";

export function ThemeToggle() {
  const { t } = useI18n();
  const mode = useThemeStore((s) => s.mode);
  const resolved = useThemeStore((s) => s.resolved);
  const setMode = useThemeStore((s) => s.setMode);
  const toggle = useThemeStore((s) => s.toggle);

  const icon = mode === "system"
    ? (resolved === "dark" ? "🌙" : "☀️")
    : (mode === "dark" ? "🌙" : "☀️");

  const cycleMode = () => {
    const next = mode === "light" ? "dark" : mode === "dark" ? "system" : "light";
    setMode(next);
  };

  return (
    <button
      onClick={toggle}
      onContextMenu={(e) => { e.preventDefault(); cycleMode(); }}
      className="px-2 py-1.5 text-xs rounded-md text-knit-text-muted hover:text-knit-text hover:bg-knit-bg-hover transition"
      title={`Theme: ${mode}${mode === "system" ? ` (${resolved})` : ""}. Right-click to cycle.`}
    >
      {icon}
    </button>
  );
}
