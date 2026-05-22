import { useI18n } from "../i18n";
import { useState } from "react";

interface Step {
  title: string;
  description: string;
}

interface WizardProps {
  title: string;
  steps: Step[];
  onComplete: () => void;
  onClose: () => void;
}

export function WizardModal({ title, steps, onComplete, onClose }: WizardProps) {
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-knit-bg-alt border border-knit-border rounded-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-knit-text font-semibold">{title}</h2>
          <button onClick={onClose} className="text-knit-text-muted hover:text-knit-text">×</button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full ${
                i <= currentStep ? "bg-knit-primary" : "bg-knit-border"
              }`}
            />
          ))}
        </div>

        {/* Current step */}
        <div className="mb-6">
          <h3 className="text-knit-text text-sm font-medium mb-1">{steps[currentStep].title}</h3>
          <p className="text-knit-text-muted text-sm">{steps[currentStep].description}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={currentStep === 0 ? onClose : () => setCurrentStep(currentStep - 1)}
            className="text-knit-text-muted hover:text-knit-text text-sm px-3 py-1.5"
          >
            {currentStep === 0 ? t("action.cancel") : t("action.back")}
          </button>
          <button
            onClick={currentStep === steps.length - 1 ? onComplete : () => setCurrentStep(currentStep + 1)}
            className="px-4 py-1.5 bg-knit-primary text-white rounded-lg text-sm hover:bg-knit-primary-hover"
          >
            {currentStep === steps.length - 1 ? t("action.finish") : t("action.next")}
          </button>
        </div>
      </div>
    </div>
  );
}
