import { useEffect, useState } from "react";
import { useContextTipsStore, contextTips } from "../store/useContextTipsStore";
import { useBuilderStore } from "../store/useBuilderStore";

export function ContextualTip() {
  const isTipVisible = useContextTipsStore((s) => s.isTipVisible);
  const dismissTip = useContextTipsStore((s) => s.dismissTip);
  const editor = useBuilderStore((s) => s.editor);
  const activePanel = useBuilderStore((s) => s.activePanel);
  const [visibleTip, setVisibleTip] = useState<string | null>(null);

  useEffect(() => {
    if (!editor) {
      if (isTipVisible("first-project") && visibleTip === null) {
        setVisibleTip("first-project");
      }
      return;
    }

    // Builder opened tip
    if (isTipVisible("drag-component") && visibleTip === null) {
      setVisibleTip("drag-component");
      return;
    }

    // Panel-specific tips
    if (activePanel === "ai" && isTipVisible("ai-hint") && visibleTip === null) {
      setVisibleTip("ai-hint");
      return;
    }
    if (activePanel === "data" && isTipVisible("data-hint") && visibleTip === null) {
      setVisibleTip("data-hint");
      return;
    }
  }, [editor, activePanel, isTipVisible, visibleTip]);

  if (!visibleTip) return null;

  const tip = contextTips.find((t) => t.id === visibleTip);
  if (!tip || !isTipVisible(tip.id)) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 animate-slide-up">
      <div className="bg-knit-bg-alt border border-knit-border/50 rounded-lg px-4 py-2.5 shadow-lg flex items-center gap-3 max-w-xs">
        <span className="text-xs text-knit-text flex-1">{tip.message}</span>
        <button
          onClick={() => { dismissTip(tip.id); setVisibleTip(null); }}
          className="text-knit-text-muted hover:text-white text-xs shrink-0"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
