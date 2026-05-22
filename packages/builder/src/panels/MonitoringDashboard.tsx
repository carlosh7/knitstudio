import { useI18n } from "../i18n";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "@knitstudio/monitoring";

export function MonitoringDashboard() {
  const { t } = useI18n();
  const [summary, setSummary] = useState({ totalProjects: 0, totalPages: 0, avgLoadTime: 0, avgExportTime: 0, totalErrors: 0, recentErrors: [] as unknown[] });

  useEffect(() => {
    setSummary(getDashboardSummary());
    const interval = setInterval(() => setSummary(getDashboardSummary()), 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: "Avg Load Time", value: `${(summary.avgLoadTime / 1000).toFixed(2)}s`, color: "text-green-400" },
    { label: "Avg Export Time", value: `${(summary.avgExportTime / 1000).toFixed(2)}s`, color: "text-blue-400" },
    { label: "Total Errors", value: String(summary.totalErrors), color: summary.totalErrors > 0 ? "text-red-400" : "text-green-400" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-white text-sm font-medium">{t("monitor.title")}</h3>
      <div className="grid grid-cols-3 gap-2">
        {cards.map((c) => (
          <div key={c.label} className="bg-knit-bg rounded-lg p-3 border border-knit-border text-center">
            <div className={`text-lg font-bold ${c.color}`}>{c.value}</div>
            <div className="text-xs text-knit-text-muted mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>
      {summary.recentErrors.length > 0 && (
        <div>
          <div className="text-xs text-knit-text-muted mb-1">{t("monitor.recent")}</div>
          <div className="space-y-1">
            {summary.recentErrors.map((err: any, i) => (
              <div key={i} className="text-xs text-red-400 bg-knit-bg p-2 rounded border border-knit-border">{err.name || err}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
