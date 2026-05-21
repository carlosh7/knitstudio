import { useEffect } from "react";
import { useUIStore } from "../store/useUIStore";

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  useEffect(() => {
    if (toasts.length === 0) return;
    const t = setTimeout(() => removeToast(toasts[0].id), 4000);
    return () => clearTimeout(t);
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2.5 rounded-lg shadow-lg text-sm flex items-center gap-3 min-w-[280px] animate-slide-up ${
            t.type === "error"
              ? "bg-red-900/90 text-red-100 border border-red-700"
              : t.type === "warning"
              ? "bg-yellow-900/90 text-yellow-100 border border-yellow-700"
              : t.type === "success"
              ? "bg-green-900/90 text-green-100 border border-green-700"
              : "bg-knit-bg-alt text-knit-text border border-knit-border"
          }`}
        >
          <span className="flex-1">{t.message}</span>
          {t.action && (
            <button
              onClick={t.action.onClick}
              className="text-xs font-medium underline hover:no-underline"
            >
              {t.action.label}
            </button>
          )}
          <button
            onClick={() => removeToast(t.id)}
            className="text-xs opacity-60 hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
