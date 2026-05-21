import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  action?: { label: string; onClick: () => void };
}

interface UIState {
  toasts: Toast[];
  showSearch: boolean;
  showChangelog: boolean;
  showRoadmap: boolean;
  saveIndicator: "saved" | "saving" | "unsaved" | "error";

  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  setShowSearch: (v: boolean) => void;
  setShowChangelog: (v: boolean) => void;
  setShowRoadmap: (v: boolean) => void;
  setSaveIndicator: (v: UIState["saveIndicator"]) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      toasts: [],
      showSearch: false,
      showChangelog: false,
      showRoadmap: false,
      saveIndicator: "saved",

      addToast: (toast) =>
        set((state) => ({
          toasts: [
            ...state.toasts,
            { ...toast, id: crypto.randomUUID() },
          ].slice(-5),
        })),

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      setShowSearch: (v) => set({ showSearch: v }),
      setShowChangelog: (v) => set({ showChangelog: v }),
      setShowRoadmap: (v) => set({ showRoadmap: v }),
      setSaveIndicator: (v) => set({ saveIndicator: v }),
    }),
    { name: "knitstudio-ui", partialize: (s) => ({ showChangelog: s.showChangelog, showRoadmap: s.showRoadmap }) }
  )
);
