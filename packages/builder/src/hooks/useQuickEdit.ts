import { useEffect } from "react";
import { useBuilderStore } from "../store/useBuilderStore";
import { useUIStore } from "../store/useUIStore";

export function useQuickEdit() {
  const editor = useBuilderStore((s) => s.editor);
  const addToast = useUIStore((s) => s.addToast);

  useEffect(() => {
    if (!editor) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "e" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        const selected = editor.getSelected();
        if (!selected) {
          addToast({ type: "info", message: "Select a component first, then press E to quick-edit" });
          return;
        }
        const type = selected.get("type");
        if (type === "text" || type === "button") {
          const current = selected.get("content") || selected.getInnerHTML();
          const newText = prompt("Edit text:", current || "");
          if (newText !== null) {
            selected.set("content", newText);
            addToast({ type: "success", message: "Text updated" });
          }
        } else {
          addToast({ type: "info", message: "Quick edit supports text and button components" });
        }
      }
    };

    editor.on("keydown", handler);
    return () => { editor.off("keydown", handler); };
  }, [editor, addToast]);
}
