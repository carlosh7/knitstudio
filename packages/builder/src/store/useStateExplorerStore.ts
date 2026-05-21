import { create } from "zustand";

interface StateExplorerState {
  variables: Record<string, unknown>;
  sources: Record<string, { status: string; data?: unknown }>;
  setVariable: (key: string, value: unknown) => void;
  setSourceStatus: (id: string, status: string, data?: unknown) => void;
  clear: () => void;
}

export const useStateExplorerStore = create<StateExplorerState>((set) => ({
  variables: { currentUser: null, isLoading: false, error: null, pageTitle: "Untitled" },
  sources: {},
  setVariable: (key, value) => set((s) => ({ variables: { ...s.variables, [key]: value } })),
  setSourceStatus: (id, status, data) => set((s) => ({ sources: { ...s.sources, [id]: { status, data } } })),
  clear: () => set({ variables: {}, sources: {} }),
}));
