import { useEffect, useRef } from "react";
import { useSaveStore } from "../store/useSaveStore";
import { useBuilderStore } from "../store/useBuilderStore";
import { useUndoStore } from "../store/useUndoStore";

export function useAutosave() {
  const markDirty = useSaveStore((s) => s.markDirty);
  const markSaved = useSaveStore((s) => s.markSaved);
  const isDirty = useSaveStore((s) => s.isDirty);
  const editor = useBuilderStore((s) => s.editor);
  const projectId = useBuilderStore((s) => s.projectId);
  const pushSnapshot = useUndoStore((s) => s.pushSnapshot);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Track editor changes → mark dirty + push undo snapshot
  useEffect(() => {
    if (!editor) return;

    const onChange = () => {
      const html = editor.getHtml();
      const css = editor.getCss();
      const data = { html, css, projectId, timestamp: Date.now() };
      markDirty(data);
    };

    const onStop = () => {
      const html = editor.getHtml();
      pushSnapshot({ html, css: editor.getCss() }, "Auto-snapshot");
    };

    editor.on("component:update", onChange);
    editor.on("component:create", onChange);
    editor.on("component:remove", onChange);
    editor.on("style:update", onChange);
    editor.on("component:update", onStop);

    return () => {
      editor.off("component:update", onChange);
      editor.off("component:create", onChange);
      editor.off("component:remove", onChange);
      editor.off("style:update", onChange);
    };
  }, [editor, projectId, markDirty, pushSnapshot]);

  // Autosave every 30s if dirty
  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      if (!isDirty) return;

      try {
        const payload = {
          projectId,
          layout: JSON.stringify({
            html: editor?.getHtml(),
            css: editor?.getCss(),
          }),
        };

        const res = await fetch("/api/projects/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          markSaved();
        }
      } catch {
        // Silent fail — will retry next interval
      }
    }, 30000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isDirty, projectId, editor]);
}
