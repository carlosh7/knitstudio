import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string;
  action?: string;
}

interface OnboardingState {
  completedSteps: string[];
  dismissed: boolean;
  profile: "designer" | "developer" | "non-technical" | "student" | null;
  matchCount: number;

  completeStep: (id: string) => void;
  dismiss: () => void;
  setProfile: (p: OnboardingState["profile"]) => void;
  incrementMatch: () => void;
  isComplete: () => boolean;
  getNextStep: () => OnboardingStep | null;
}

const steps: OnboardingStep[] = [
  { id: "welcome", title: "Welcome to knitstudio", description: "The visual app builder. Let's get you started!" },
  { id: "create-project", title: "Create a project", description: "Click 'New Project' to start building.", targetSelector: "[data-onboard='new-project']", action: "Click the button" },
  { id: "choose-template", title: "Choose a template", description: "Pick a template or start from scratch depending on your skill level." },
  { id: "add-components", title: "Add components", description: "Open the Components panel and drag elements onto your canvas.", targetSelector: "[data-panel='blocks']", action: "Click Components" },
  { id: "edit-styles", title: "Edit styles", description: "Select any component and use the Style panel to change colors, fonts, spacing." },
  { id: "connect-data", title: "Connect data", description: "Use the Data panel to connect your UI to real APIs." },
  { id: "publish", title: "Publish", description: "When ready, publish your project. You can always come back to edit." },
];

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      completedSteps: [],
      dismissed: false,
      profile: null,
      matchCount: 0,

      completeStep: (id) => set((s) => ({ completedSteps: [...new Set([...s.completedSteps, id])] })),

      dismiss: () => set({ dismissed: true }),

      setProfile: (profile) => set({ profile }),

      incrementMatch: () => set((s) => ({ matchCount: s.matchCount + 1 })),

      isComplete: () => {
        const s = get();
        return s.dismissed || s.completedSteps.length >= steps.length;
      },

      getNextStep: () => {
        const { completedSteps } = get();
        return steps.find((step) => !completedSteps.includes(step.id)) ?? null;
      },
    }),
    { name: "knitstudio-onboarding" }
  )
);

export { steps };
