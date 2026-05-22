import { useI18n } from "../i18n";
import { useSafetyNetStore } from "../store/useSafetyNetStore";
import { useBuilderStore } from "../store/useBuilderStore";
import { useUIStore } from "../store/useUIStore";

export function SafetyNetPanel() {
  const { t } = useI18n();
  const snapshots = useSafetyNetStore((s) => s.snapshots);
  const takeSnapshot = useSafetyNetStore((s) => s.takeSnapshot);
  const restoreSnapshot = useSafetyNetStore((s) => s.restoreSnapshot);
  const deleteSnapshot = useSafetyNetStore((s) => s.deleteSnapshot);
  const editor = useBuilderStore((s) => s.editor);
  const addToast = useUIStore((s) => s.addToast);

  const handleTakeSnapshot = () => {
    if (!editor) return;
    const data = { html: editor.getHtml(), css: editor.getCss() };
    const label = `Snapshot ${snapshots.length + 1}`;
    takeSnapshot(label, data);
    addToast({ type: "success", message: `Snapshot saved: ${label}` });
  };

  const handleRestore = (id: string) => {
    const snapshot = restoreSnapshot(id);
    if (!snapshot || !editor) return;
    const data = snapshot.data as { html?: string; css?: string };
    if (data.html) editor.setComponents(data.html);
    addToast({ type: "info", message: `Restored: ${snapshot.label}` });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-sm font-medium">{t("safety.title")}</h3>
        <button
          onClick={handleTakeSnapshot}
          className="px-3 py-1 text-xs bg-green-700 text-white rounded-lg hover:bg-green-600"
        >
          + Take Snapshot
        </button>
      </div>

      {snapshots.length === 0 && (
        <div className="text-xs text-knit-text-muted text-center py-6">
          No snapshots yet. Take one before making big changes — you can always restore.
        </div>
      )}

      <div className="space-y-2">
        {[...snapshots].reverse().map((s) => (
          <div key={s.id} className="flex items-center justify-between bg-knit-bg rounded-lg p-3 border border-knit-border">
            <div>
              <div className="text-sm text-white">{s.label}</div>
              <div className="text-xs text-knit-text-muted">{new Date(s.timestamp).toLocaleString()}</div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => handleRestore(s.id)} className="px-2 py-1 text-xs bg-knit-primary text-white rounded">{t("action.restore")}</button>
              <button onClick={() => deleteSnapshot(s.id)} className="px-2 py-1 text-xs text-knit-text-muted hover:text-red-400">×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
