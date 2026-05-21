import { useEffect, useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { BuilderView } from "./BuilderView";
import { ToastContainer } from "./components/ToastContainer";
import { SearchOverlay } from "./components/SearchOverlay";
import { HelpPanel } from "./components/HelpPanel";
import { ContextualTip } from "./components/ContextualTip";
import { useUIStore } from "./store/useUIStore";

type View = { type: "dashboard" } | { type: "builder"; projectId: string };

export function App() {
  const [view, setView] = useState<View>({ type: "dashboard" });
  const showSearch = useUIStore((s) => s.showSearch);
  const setShowSearch = useUIStore((s) => s.setShowSearch);
  const [showHelp, setShowHelp] = useState(false);

  // Cmd+K / Ctrl+K global search + F1 help
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === "F1") {
        e.preventDefault();
        setShowHelp((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setShowSearch]);

  const handleSearchAction = (id: string) => {
    if (id === "create-page" || id === "publish" || id === "export") {
      setView({ type: "builder", projectId: "new" });
    }
  };

  return (
    <>
      <ToastContainer />
      <ContextualTip />

      {showSearch && (
        <SearchOverlay
          onClose={() => setShowSearch(false)}
          onAction={handleSearchAction}
        />
      )}

      {showHelp && (
        <HelpPanel onClose={() => setShowHelp(false)} />
      )}

      {view.type === "builder" ? (
        <BuilderView
          projectId={view.projectId}
          onBack={() => setView({ type: "dashboard" })}
        />
      ) : (
        <Dashboard
          onOpenProject={(id) => setView({ type: "builder", projectId: id })}
        />
      )}
    </>
  );
}
