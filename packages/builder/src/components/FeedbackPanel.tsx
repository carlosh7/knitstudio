import { useI18n } from "../i18n";
import { useState } from "react";
import { useUIStore } from "../store/useUIStore";

export function FeedbackPanel({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const addToast = useUIStore((s) => s.addToast);
  const [type, setType] = useState<"bug" | "feature" | "feedback">("feedback");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;

    const payload = { type, message, email: email || "anonymous", url: window.location.href, timestamp: new Date().toISOString() };

    // Store locally + try to send
    const existing = JSON.parse(localStorage.getItem("knitstudio-feedback") || "[]");
    existing.push(payload);
    localStorage.setItem("knitstudio-feedback", JSON.stringify(existing));

    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    addToast({ type: "success", message: `Thanks for your ${type}!` });
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-5 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-white font-semibold mb-4">{t("feedback.title")}</h2>

        <div className="flex gap-2 mb-4">
          {(["feedback", "bug", "feature"] as const).map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={`px-3 py-1 text-xs rounded-md capitalize ${type === t ? "bg-knit-primary text-white" : "bg-knit-bg text-knit-text-muted"}`}>
              {t === "bug" ? "🐛 Bug" : t === "feature" ? "✨ Feature" : "💬 Feedback"}
            </button>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("feedback.placeholder")}
          rows={4}
          className="w-full px-3 py-2 bg-knit-bg border border-knit-border rounded-lg text-sm text-white placeholder-knit-text-muted resize-none mb-3 focus:outline-none focus:border-knit-primary"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("feedback.email_placeholder")}
          className="w-full px-3 py-2 bg-knit-bg border border-knit-border rounded-lg text-sm text-white placeholder-knit-text-muted mb-4 focus:outline-none focus:border-knit-primary"
        />

        <div className="flex gap-2">
          <button onClick={handleSubmit} disabled={!message.trim()}
            className="flex-1 px-3 py-1.5 bg-knit-primary text-white rounded-lg text-sm">{t("action.send")}</button>
          <button onClick={onClose} className="px-3 py-1.5 text-knit-text-muted text-sm">{t("action.cancel")}</button>
        </div>
      </div>
    </div>
  );
}
