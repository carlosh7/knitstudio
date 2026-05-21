interface Metric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

const metrics: Metric[] = [];

export function trackMetric(name: string, value: number, unit: string = "ms"): void {
  metrics.push({ name, value, unit, timestamp: Date.now() });
  // Keep last 1000 metrics in memory
  if (metrics.length > 1000) metrics.shift();
}

export function getMetrics(name?: string): Metric[] {
  if (name) return metrics.filter((m) => m.name === name);
  return [...metrics];
}

export function getDashboardSummary() {
  const loadTime = metrics.filter((m) => m.name === "builder_load");
  const exportTime = metrics.filter((m) => m.name === "export_time");
  const errors = metrics.filter((m) => m.name === "error");

  return {
    totalProjects: 0,
    totalPages: 0,
    avgLoadTime: loadTime.length ? loadTime.reduce((s, m) => s + m.value, 0) / loadTime.length : 0,
    avgExportTime: exportTime.length ? exportTime.reduce((s, m) => s + m.value, 0) / exportTime.length : 0,
    totalErrors: errors.length,
    recentErrors: errors.slice(-10),
  };
}

// Track builder performance automatically
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perf = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (perf) {
        trackMetric("builder_load", perf.loadEventEnd - perf.startTime, "ms");
      }
    }, 0);
  });
}
