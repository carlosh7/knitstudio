import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  resolved: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => {
      // Initial apply
      const initialMode = "system";
      const initialResolved = getSystemTheme();
      if (typeof document !== "undefined") applyTheme(initialResolved);

      // Listen for system theme changes
      if (typeof window !== "undefined") {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
          if (get().mode === "system") {
            const resolved = e.matches ? "dark" : "light";
            applyTheme(resolved);
            set({ resolved });
          }
        });
      }

      return {
        mode: initialMode as ThemeMode,
        resolved: initialResolved,
        setMode: (mode) => {
          const resolved = mode === "system" ? getSystemTheme() : mode;
          applyTheme(resolved);
          set({ mode, resolved });
        },
        toggle: () => {
          const current = get().resolved;
          const next = current === "dark" ? "light" : "dark";
          applyTheme(next);
          set({ mode: next, resolved: next });
        },
      };
    },
    { name: "knitstudio-theme" }
  )
);
