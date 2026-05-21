import { useState } from "react";
import { useDataBindingStore } from "../store/useDataBindingStore";

export function DataBindingPanel() {
  const sources = useDataBindingStore((s) => s.sources);
  const bindings = useDataBindingStore((s) => s.bindings);
  const debugMode = useDataBindingStore((s) => s.debugMode);
  const breakpoints = useDataBindingStore((s) => s.breakpoints);
  const currentStep = useDataBindingStore((s) => s.currentStep);
  const logs = useDataBindingStore((s) => s.logs);
  const addSource = useDataBindingStore((s) => s.addSource);
  const removeSource = useDataBindingStore((s) => s.removeSource);
  const setDebugMode = useDataBindingStore((s) => s.setDebugMode);
  const toggleBreakpoint = useDataBindingStore((s) => s.toggleBreakpoint);
  const executeSource = useDataBindingStore((s) => s.executeSource);
  const executeAll = useDataBindingStore((s) => s.executeAll);
  const clearLogs = useDataBindingStore((s) => s.clearLogs);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<"GET" | "POST">("GET");

  const handleAdd = () => {
    if (!name || !url) return;
    addSource({ id: crypto.randomUUID(), name, url, method });
    setName("");
    setUrl("");
    setShowForm(false);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left: Sources */}
      <div className="w-1/2 border-r border-knit-border p-3 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-sm font-medium">Data Sources</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setDebugMode(!debugMode)}
              className={`px-2 py-1 text-xs rounded ${debugMode ? "bg-yellow-600 text-white" : "bg-knit-bg text-knit-text-muted"}`}
            >
              {debugMode ? "🐞 Debug ON" : "Debug"}
            </button>
            <button onClick={() => setShowForm(true)} className="px-2 py-1 text-xs bg-knit-primary text-white rounded">+ Add</button>
          </div>
        </div>

        {showForm && (
          <div className="bg-knit-bg rounded-lg p-3 mb-3 border border-knit-border space-y-2">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Source name" className="w-full px-2 py-1 bg-knit-bg-alt border border-knit-border rounded text-xs text-white" />
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/data" className="w-full px-2 py-1 bg-knit-bg-alt border border-knit-border rounded text-xs text-white" />
            <select value={method} onChange={(e) => setMethod(e.target.value as "GET" | "POST")} className="w-full px-2 py-1 bg-knit-bg-alt border border-knit-border rounded text-xs text-white">
              <option>GET</option><option>POST</option>
            </select>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="px-3 py-1 bg-knit-primary text-white rounded text-xs">Save</button>
              <button onClick={() => setShowForm(false)} className="text-knit-text-muted text-xs">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {sources.map((src, i) => (
            <div key={src.id} className={`bg-knit-bg rounded-lg p-3 border ${currentStep === i ? "border-yellow-500" : "border-knit-border"}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono px-1 py-0.5 rounded ${src.method === "GET" ? "bg-green-900/50 text-green-300" : "bg-blue-900/50 text-blue-300"}`}>{src.method}</span>
                  <span className="text-sm text-white">{src.name}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleBreakpoint(src.id)} className={`px-1.5 py-0.5 text-xs rounded ${breakpoints.includes(src.id) ? "bg-red-700 text-white" : "bg-knit-bg-alt text-knit-text-muted"}`}>●</button>
                  <button onClick={() => executeSource(src.id)} className="px-2 py-0.5 text-xs bg-knit-primary text-white rounded">▶</button>
                  <button onClick={() => removeSource(src.id)} className="text-knit-text-muted hover:text-red-400 text-xs">×</button>
                </div>
              </div>
              <div className="text-xs text-knit-text-muted truncate">{src.url}</div>
            </div>
          ))}
          {sources.length === 0 && <div className="text-xs text-knit-text-muted text-center py-8">No data sources. Click + Add to connect an API.</div>}
        </div>

        {sources.length > 0 && (
          <button onClick={executeAll} className="w-full mt-3 px-3 py-1.5 bg-knit-primary text-white rounded text-xs">
            ▶ Execute All ({sources.length} sources)
          </button>
        )}
      </div>

      {/* Right: Logs */}
      <div className="w-1/2 p-3 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-sm font-medium">Execution Log</h3>
          <button onClick={clearLogs} className="text-xs text-knit-text-muted hover:text-white">Clear</button>
        </div>

        <div className="space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="text-xs font-mono bg-knit-bg p-2 rounded border border-knit-border">
              <span className={log.status.includes("OK") ? "text-green-400" : "text-red-400"}>[{log.status}]</span>{" "}
              <span className="text-knit-text-muted">{sources.find((s) => s.id === log.sourceId)?.name || log.sourceId}</span>
            </div>
          ))}
          {logs.length === 0 && <div className="text-xs text-knit-text-muted text-center py-8">No execution logs yet</div>}
        </div>
      </div>
    </div>
  );
}
