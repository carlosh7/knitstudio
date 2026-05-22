import { uuid } from "../lib/uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SafeSnapshot {
  id: string;
  timestamp: number;
  label: string;
  data: unknown;
}

interface SafetyNetState {
  snapshots: SafeSnapshot[];
  takeSnapshot: (label: string, data: unknown) => void;
  restoreSnapshot: (id: string) => SafeSnapshot | null;
  deleteSnapshot: (id: string) => void;
  clear: () => void;
}

export const useSafetyNetStore = create<SafetyNetState>()(
  persist(
    (set, get) => ({
      snapshots: [],

      takeSnapshot: (label, data) => {
        const snapshot: SafeSnapshot = {
          id: uuid(),
          timestamp: Date.now(),
          label,
          data,
        };
        set((s) => ({ snapshots: [...s.snapshots.slice(-50), snapshot] }));
      },

      restoreSnapshot: (id) => {
        const snapshot = get().snapshots.find((s) => s.id === id);
        return snapshot ?? null;
      },

      deleteSnapshot: (id) => {
        set((s) => ({ snapshots: s.snapshots.filter((sn) => sn.id !== id) }));
      },

      clear: () => set({ snapshots: [] }),
    }),
    { name: "knitstudio-safety" }
  )
);
