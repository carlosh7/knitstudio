import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SaveState {
  lastSaved: number | null;
  isDirty: boolean;
  draftData: unknown | null;
  publishedData: unknown | null;

  markDirty: (data: unknown) => void;
  markSaved: () => void;
  getDraft: () => unknown | null;
  getPublished: () => unknown | null;
  publish: () => void;
  unpublish: () => void;
  isPublished: () => boolean;
}

export const useSaveStore = create<SaveState>()(
  persist(
    (set, get) => ({
      lastSaved: null,
      isDirty: false,
      draftData: null,
      publishedData: null,

      markDirty: (data) => set({ isDirty: true, draftData: data }),

      markSaved: () =>
        set({ isDirty: false, lastSaved: Date.now() }),

      getDraft: () => get().draftData,

      getPublished: () => get().publishedData,

      publish: () => {
        const { draftData } = get();
        set({ publishedData: draftData, isDirty: false, lastSaved: Date.now() });
      },

      unpublish: () => set({ publishedData: null }),

      isPublished: () => get().publishedData !== null,
    }),
    { name: "knitstudio-save" }
  )
);
