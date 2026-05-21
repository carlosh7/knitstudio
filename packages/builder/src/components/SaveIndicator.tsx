import { useUIStore } from "../store/useUIStore";

const indicators = {
  saved: { label: "Saved", color: "text-green-400", icon: "✓" },
  saving: { label: "Saving...", color: "text-yellow-400", icon: "⏳" },
  unsaved: { label: "Unsaved", color: "text-orange-400", icon: "●" },
  error: { label: "Save failed", color: "text-red-400", icon: "✕" },
};

export function SaveIndicator() {
  const indicator = useUIStore((s) => s.saveIndicator);

  const { label, color, icon } = indicators[indicator];

  return (
    <span className={`flex items-center gap-1 text-xs ${color}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}
