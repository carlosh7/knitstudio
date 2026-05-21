import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UndoEntry {
  id: string;
  timestamp: number;
  snapshot: unknown;
  label: string;
}

interface UndoState {
  history: UndoEntry[];
  currentIndex: number;
  pushSnapshot: (snapshot: unknown, label: string) => void;
  undo: () => unknown | null;
  redo: () => unknown | null;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clear: () => void;
}

export const useUndoStore = create<UndoState>()(
  persist(
    (set, get) => ({
      history: [],
      currentIndex: -1,

      pushSnapshot: (snapshot, label) => {
        const { history, currentIndex } = get();
        const entry: UndoEntry = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          snapshot,
          label,
        };
        const trimmed = history.slice(0, currentIndex + 1);
        const max = 200;
        const newHistory = [...trimmed, entry].slice(-max);
        set({ history: newHistory, currentIndex: newHistory.length - 1 });
      },

      undo: () => {
        const { history, currentIndex } = get();
        if (currentIndex <= 0) return null;
        const newIndex = currentIndex - 1;
        set({ currentIndex: newIndex });
        return history[newIndex]?.snapshot ?? null;
      },

      redo: () => {
        const { history, currentIndex } = get();
        if (currentIndex >= history.length - 1) return null;
        const newIndex = currentIndex + 1;
        set({ currentIndex: newIndex });
        return history[newIndex]?.snapshot ?? null;
      },

      canUndo: () => get().currentIndex > 0,
      canRedo: () => get().currentIndex < get().history.length - 1,
      clear: () => set({ history: [], currentIndex: -1 }),
    }),
    { name: "knitstudio-undo" }
  )
);
