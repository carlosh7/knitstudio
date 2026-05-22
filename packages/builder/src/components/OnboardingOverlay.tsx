import { useI18n } from "../i18n";
import { useEffect, useState } from "react";
import { useOnboardingStore, steps } from "../store/useOnboardingStore";

export function OnboardingOverlay() {
  const { t } = useI18n();
  const isComplete = useOnboardingStore((s) => s.isComplete());
  const dismissed = useOnboardingStore((s) => s.dismissed);
  const profile = useOnboardingStore((s) => s.profile);
  const setProfile = useOnboardingStore((s) => s.setProfile);
  const completeStep = useOnboardingStore((s) => s.completeStep);
  const dismiss = useOnboardingStore((s) => s.dismiss);
  const getNextStep = useOnboardingStore((s) => s.getNextStep);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (profile === null && !dismissed && !isComplete) {
      setShowProfile(true);
    }
  }, [profile, dismissed, isComplete]);

  if (dismissed || isComplete) return null;

  // Profile selector
  if (showProfile) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
        <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-6 max-w-sm w-full mx-4 text-center">
          <div className="text-3xl mb-3">🧶</div>
          <h2 className="text-knit-text text-lg font-semibold mb-2">{t("onboarding.welcome_title")}</h2>
          <p className="text-knit-text-muted text-sm mb-4">Tell us about yourself so we can tailor the experience.</p>
          <div className="space-y-2">
            {[
              { id: "designer", label: "Designer", desc: "Visual, drag & drop, focus on UI" },
              { id: "developer", label: "Developer", desc: "Code, APIs, data binding" },
              { id: "non-technical", label: "Non-technical", desc: "Wizards, templates, simple mode" },
              { id: "student", label: "Student", desc: "Learning, tutorials, examples" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setProfile(p.id as typeof profile);
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg border border-knit-border hover:border-knit-primary bg-knit-bg transition group"
              >
                <div className="text-sm text-white font-medium group-hover:text-knit-primary">{p.label}</div>
                <div className="text-xs text-knit-text-muted">{p.desc}</div>
              </button>
            ))}
          </div>
          <button onClick={dismiss} className="mt-4 text-xs text-knit-text-muted hover:text-knit-text">{t("onboarding.skip")}</button>
        </div>
      </div>
    );
  }

  // Step-by-step
  const step = steps[currentStep];
  if (!step) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-4 max-w-xs shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-knit-text-muted">Step {currentStep + 1}/{steps.length}</span>
          <button onClick={dismiss} className="text-knit-text-muted hover:text-knit-text text-xs">{t("action.skip_all")}</button>
        </div>
        <h3 className="text-knit-text text-sm font-medium mb-1">{step.title}</h3>
        <p className="text-knit-text-muted text-xs mb-3">{step.description}</p>
        <div className="flex gap-2">
          {currentStep > 0 && (
            <button onClick={() => setCurrentStep(currentStep - 1)} className="px-3 py-1 text-xs text-knit-text-muted hover:text-knit-text">{t("action.back")}</button>
          )}
          <button
            onClick={() => {
              completeStep(step.id);
              const next = getNextStep();
              if (next) setCurrentStep(currentStep + 1);
            }}
            className="px-3 py-1 text-xs bg-knit-primary text-white rounded-lg"
          >
            {currentStep < steps.length - 1 ? "Next" : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
