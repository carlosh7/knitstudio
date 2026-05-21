import { useState } from "react";
import { useUIStore } from "../store/useUIStore";

export function SandboxButton() {
  const addToast = useUIStore((s) => s.addToast);
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
    if (!active) {
      addToast({ type: "info", message: "Sandbox mode ON — no changes are saved", action: { label: "Exit", onClick: () => setActive(false) } });
    } else {
      addToast({ type: "info", message: "Sandbox mode OFF" });
    }
  };

  return (
    <button
      onClick={toggle}
      className={`px-2 py-1 text-xs rounded-md transition ${active ? "bg-yellow-600 text-white" : "bg-knit-bg text-knit-text-muted hover:text-white"}`}
      title="Sandbox mode — temporary project, no saves"
    >
      {active ? "🏖️ Sandbox" : "Sandbox"}
    </button>
  );
}
