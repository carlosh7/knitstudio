import { create } from "zustand";
import type { Editor } from "grapesjs";

export type Mode = "simple" | "advanced";
export type PanelId = "blocks" | "layers" | "styles" | "actions" | "data" | "ai" | "safety" | "versions" | "monitoring" | "selfedit" | "sandbox" | null;

interface BuilderState {
  mode: Mode;
  editor: Editor | null;
  isReady: boolean;
  activePanel: PanelId;
  projectId: string;
  pageId: string;

  setMode: (mode: Mode) => void;
  setEditor: (editor: Editor) => void;
  setActivePanel: (panel: PanelId) => void;
  setProjectId: (id: string) => void;
  setPageId: (id: string) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  mode: "simple",
  editor: null,
  isReady: false,
  activePanel: null,
  projectId: "default",
  pageId: "page-1",

  setMode: (mode) => set({ mode }),
  setEditor: (editor) => set({ editor, isReady: true }),
  setActivePanel: (panel) =>
    set((state) => ({ activePanel: state.activePanel === panel ? null : panel })),
  setProjectId: (id) => set({ projectId: id }),
  setPageId: (id) => set({ pageId: id }),
}));
