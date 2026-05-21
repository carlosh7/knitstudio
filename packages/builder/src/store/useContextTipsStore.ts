import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TooltipState {
  dismissedTips: string[];
  showAllTips: boolean;
  dismissTip: (id: string) => void;
  resetTips: () => void;
  isTipVisible: (id: string) => boolean;
}

const contextTips = [
  { id: "first-project", trigger: "dashboard:empty", message: "💡 Click 'Create your first project' to get started!" },
  { id: "drag-component", trigger: "builder:open", message: "💡 Open the Components panel and drag items onto the canvas" },
  { id: "quick-edit", trigger: "component:selected", message: "💡 Press 'E' to edit this component's text inline" },
  { id: "undo-hint", trigger: "edit:made", message: "💡 Made a mistake? Press Ctrl+Z to undo" },
  { id: "safety-hint", trigger: "publish:click", message: "💡 Before publishing, take a Safety Net snapshot!" },
  { id: "ai-hint", trigger: "ai:panel:open", message: "💡 Describe what you want clearly. 'Dark login form' works better than 'something nice'" },
  { id: "data-hint", trigger: "data:panel:open", message: "💡 Add a source first, then execute it to see the response" },
  { id: "search-hint", trigger: "search:open", message: "💡 Search pages, components, and actions from one place" },
];

export const useContextTipsStore = create<TooltipState>()(
  persist(
    (set, get) => ({
      dismissedTips: [],
      showAllTips: true,
      dismissTip: (id) => set((s) => ({ dismissedTips: [...s.dismissedTips, id] })),
      resetTips: () => set({ dismissedTips: [] }),
      isTipVisible: (id) => get().showAllTips && !get().dismissedTips.includes(id),
    }),
    { name: "knitstudio-tips" }
  )
);

export { contextTips };
