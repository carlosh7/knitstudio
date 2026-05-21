import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DataSource {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers?: Record<string, string>;
  body?: string;
}

interface Binding {
  componentId: string;
  property: string;
  sourceId: string;
  sourcePath: string;
}

interface DataBindingState {
  sources: DataSource[];
  bindings: Binding[];
  debugMode: boolean;
  breakpoints: string[];
  currentStep: number | null;
  logs: Array<{ timestamp: number; sourceId: string; status: string; data?: unknown }>;

  addSource: (source: DataSource) => void;
  removeSource: (id: string) => void;
  addBinding: (binding: Binding) => void;
  removeBinding: (componentId: string, property: string) => void;
  setDebugMode: (v: boolean) => void;
  toggleBreakpoint: (sourceId: string) => void;
  setCurrentStep: (step: number | null) => void;
  addLog: (log: { sourceId: string; status: string; data?: unknown }) => void;
  executeSource: (sourceId: string) => Promise<void>;
  executeAll: () => Promise<void>;
  clearLogs: () => void;
}

export const useDataBindingStore = create<DataBindingState>()(
  persist(
    (set, get) => ({
      sources: [],
      bindings: [],
      debugMode: false,
      breakpoints: [],
      currentStep: null,
      logs: [],

      addSource: (source) => set((s) => ({ sources: [...s.sources, source] })),

      removeSource: (id) => set((s) => ({ sources: s.sources.filter((src) => src.id !== id), bindings: s.bindings.filter((b) => b.sourceId !== id) })),

      addBinding: (binding) => set((s) => ({ bindings: [...s.bindings, binding] })),

      removeBinding: (componentId, property) => set((s) => ({ bindings: s.bindings.filter((b) => !(b.componentId === componentId && b.property === property)) })),

      setDebugMode: (v) => set({ debugMode: v }),

      toggleBreakpoint: (sourceId) => set((s) => ({
        breakpoints: s.breakpoints.includes(sourceId) ? s.breakpoints.filter((id) => id !== sourceId) : [...s.breakpoints, sourceId],
      })),

      setCurrentStep: (step) => set({ currentStep: step }),

      addLog: (log) => set((s) => ({ logs: [...s.logs.slice(-50), { ...log, timestamp: Date.now() }] })),

      executeSource: async (sourceId) => {
        const { sources, breakpoints, debugMode, addLog, setCurrentStep } = get();
        const source = sources.find((s) => s.id === sourceId);
        if (!source) return;

        if (debugMode && breakpoints.includes(sourceId)) {
          setCurrentStep(sources.indexOf(source));
          await new Promise<void>((resolve) => {
            const handler = (e: KeyboardEvent) => {
              if (e.key === "Enter") {
                setCurrentStep(null);
                window.removeEventListener("keydown", handler);
                resolve();
              }
            };
            window.addEventListener("keydown", handler);
          });
        }

        try {
          const res = await fetch(source.url, {
            method: source.method,
            headers: { "Content-Type": "application/json", ...source.headers },
            body: source.method !== "GET" ? source.body : undefined,
          });
          const data = await res.json();
          addLog({ sourceId, status: `${res.status} OK`, data });
        } catch (err) {
          addLog({ sourceId, status: "ERROR", data: String(err) });
        }
      },

      executeAll: async () => {
        const { sources, executeSource, setCurrentStep } = get();
        for (let i = 0; i < sources.length; i++) {
          setCurrentStep(i);
          await executeSource(sources[i].id);
        }
        setCurrentStep(null);
      },

      clearLogs: () => set({ logs: [] }),
    }),
    { name: "knitstudio-databinding" }
  )
);
