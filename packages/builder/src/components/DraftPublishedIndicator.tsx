import { useI18n } from "../i18n";
import { useSaveStore } from "../store/useSaveStore";

export function DraftPublishedIndicator() {
  const { t } = useI18n();
  const isDirty = useSaveStore((s) => s.isDirty);
  const publishedData = useSaveStore((s) => s.publishedData);

  const hasPublished = publishedData !== null;

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`flex items-center gap-1 ${isDirty ? "text-orange-400" : "text-green-400"}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isDirty ? "bg-orange-400" : "bg-green-400"}`} />
        {isDirty ? t("editor.unsaved") : t("editor.save.success")}
      </span>
      {hasPublished && (
        <span className="flex items-center gap-1 text-blue-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          {t("action.published")}
        </span>
      )}
    </div>
  );
}
