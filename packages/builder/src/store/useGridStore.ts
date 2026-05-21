import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GridState {
  snapToGrid: boolean;
  gridSize: number;
  showGrid: boolean;
  toggleSnap: () => void;
  setGridSize: (size: number) => void;
  setShowGrid: (v: boolean) => void;
}

export const useGridStore = create<GridState>()(
  persist(
    (set) => ({
      snapToGrid: false,
      gridSize: 8,
      showGrid: false,
      toggleSnap: () => set((s) => ({ snapToGrid: !s.snapToGrid })),
      setGridSize: (size) => set({ gridSize: size }),
      setShowGrid: (v) => set({ showGrid: v }),
    }),
    { name: "knitstudio-grid" }
  )
);
