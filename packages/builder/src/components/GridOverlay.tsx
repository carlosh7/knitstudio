import { useGridStore } from "../store/useGridStore";

export function GridOverlay() {
  const showGrid = useGridStore((s) => s.showGrid);
  const gridSize = useGridStore((s) => s.gridSize);

  if (!showGrid) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(79,70,229,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,70,229,0.08) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    />
  );
}
