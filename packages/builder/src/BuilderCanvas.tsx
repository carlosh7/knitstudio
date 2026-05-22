import { useBuilderStore } from "./store/useBuilderStore";
import { KnitCanvas } from "@knitstudio/canvas";

export function BuilderCanvas() {
  const projectId = useBuilderStore((s) => s.projectId);
  const pageId = useBuilderStore((s) => s.pageId);
  const setEditor = useBuilderStore((s) => s.setEditor);

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-knit-canvas-bg min-h-0" style={{ minHeight: 0 }}>
      <div className="flex-1 relative" style={{ minHeight: "calc(100vh - 48px)" }}>
        <KnitCanvas
          projectId={projectId}
          pageId={pageId}
          onReady={setEditor}
        />
      </div>
    </div>
  );
}
