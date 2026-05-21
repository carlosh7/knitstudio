import { useEffect, useState } from "react";
import { useBuilderStore } from "./store/useBuilderStore";
import type { PanelId } from "./store/useBuilderStore";
import { useUIStore } from "./store/useUIStore";
import { useUndoStore } from "./store/useUndoStore";
import { useSaveStore } from "./store/useSaveStore";
import { useAutosave } from "./hooks/useAutosave";
import { useQuickEdit } from "./hooks/useQuickEdit";
import { BuilderCanvas } from "./BuilderCanvas";
import { ActionFlowPanel } from "./panels/ActionFlowPanel";
import { BlocksPanel } from "./panels/BlocksPanel";
import { DataBindingPanel } from "./panels/DataBindingPanel";
import { AIPromptPanel } from "./panels/AIPromptPanel";
import { SafetyNetPanel } from "./panels/SafetyNetPanel";
import { VersionBrowser } from "./panels/VersionBrowser";
import { MonitoringDashboard } from "./panels/MonitoringDashboard";
import { SelfEditPanel } from "./panels/SelfEditPanel";
import { ComponentSandbox } from "./panels/ComponentSandbox";
import { ShortcutsPanel } from "./panels/ShortcutsPanel";
import { WizardModal } from "./components/WizardModal";
import { ChangelogModal } from "./components/ChangelogModal";
import { RoadmapModal } from "./components/RoadmapModal";
import { FeedbackPanel } from "./components/FeedbackPanel";
import { SettingsPanel } from "./panels/SettingsPanel";
import { ShowcaseGallery } from "./components/ShowcaseGallery";
import { HelpPanel } from "./components/HelpPanel";
import { OnboardingOverlay } from "./components/OnboardingOverlay";
import { SandboxButton } from "./components/SandboxButton";
import { GridOverlay } from "./components/GridOverlay";
import { GridSettingsModal } from "./components/GridSettingsModal";
import { SaveIndicator } from "./components/SaveIndicator";
import { DraftPublishedIndicator } from "./components/DraftPublishedIndicator";
import { SkeletonPanel } from "./components/SkeletonPanel";
import { PanelErrorBoundary } from "./components/PanelErrorBoundary";
import { Panel } from "@knitstudio/ui";

const panelConfig: Array<{ id: PanelId; label: string }> = [
  { id: "blocks", label: "Components" },
  { id: "layers", label: "Layers" },
  { id: "styles", label: "Styles" },
  { id: "actions", label: "Actions" },
  { id: "data", label: "Data" },
  { id: "ai", label: "AI" },
  { id: "safety", label: "Safety" },
  { id: "versions", label: "Versions" },
  { id: "monitoring", label: "Monitor" },
  { id: "selfedit", label: "SelfEdit" },
  { id: "sandbox", label: "Sandbox" },
];

const createPageSteps = [
  { title: "Name your page", description: "Give your new page a name and URL route." },
  { title: "Choose a template", description: "Start from a blank page or choose a template: Dashboard, Form, Landing, or List." },
  { title: "Pick a layout", description: "Choose a column layout: single column, two columns, sidebar + content." },
  { title: "Ready to edit", description: "Your page is ready! Start dragging components onto it." },
];

interface BuilderViewProps {
  projectId: string;
  onBack: () => void;
}

export function BuilderView({ projectId, onBack }: BuilderViewProps) {
  const mode = useBuilderStore((s) => s.mode);
  const setMode = useBuilderStore((s) => s.setMode);
  const activePanel = useBuilderStore((s) => s.activePanel);
  const setActivePanel = useBuilderStore((s) => s.setActivePanel);
  const setProjectId = useBuilderStore((s) => s.setProjectId);
  const setShowSearch = useUIStore((s) => s.setShowSearch);
  const addToast = useUIStore((s) => s.addToast);
  const setSaveIndicator = useUIStore((s) => s.setSaveIndicator);
  const undo = useUndoStore((s) => s.undo);
  const redo = useUndoStore((s) => s.redo);
  const pushSnapshot = useUndoStore((s) => s.pushSnapshot);
  const editor = useBuilderStore((s) => s.editor);
  const markDirty = useSaveStore((s) => s.markDirty);
  const markSaved = useSaveStore((s) => s.markSaved);
  const publish = useSaveStore((s) => s.publish);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showGridSettings, setShowGridSettings] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [sandboxMode, setSandboxMode] = useState(false);

  useAutosave();
  useQuickEdit();

  useEffect(() => { setProjectId(projectId); }, [projectId, setProjectId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (e.key === "?" && !isMod) {
        setShowShortcuts((v) => !v);
      }
      if (isMod && e.key === "s") {
        e.preventDefault();
        setSaveIndicator("saving");
        if (editor) {
          const html = editor.getHtml();
          markDirty({ html, css: editor.getCss() });
        }
        setTimeout(() => { setSaveIndicator("saved"); markSaved(); }, 500);
        addToast({ type: "success", message: "Project saved" });
      }
      if (isMod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if (isMod && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [addToast, setSaveIndicator, editor, markDirty, markSaved, undo, redo]);

  const handlePublish = async () => {
    if (mode === "simple") {
      setShowWizard(true);
      return;
    }
    publish();
    addToast({ type: "success", message: "Publishing..." });
    try {
      const html = editor?.getHtml();
      await fetch("/api/projects/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, layout: JSON.stringify({ html, css: editor?.getCss() }) }),
      });
      addToast({ type: "success", message: "Project published!" });
    } catch {
      addToast({ type: "error", message: "Publish failed — check API connection" });
    }
  };

  const renderPanelContent = () => {
    if (!activePanel) return null;
    switch (activePanel) {
      case "blocks": return <BlocksPanel />;
      case "layers": return <div className="text-knit-text-muted text-xs">Layer tree will appear here</div>;
      case "styles": return <div className="text-knit-text-muted text-xs">Style properties (use GrapesJS native panel)</div>;
      case "data": return <DataBindingPanel />;
      case "ai": return <AIPromptPanel />;
      case "safety": return <SafetyNetPanel />;
      case "versions": return <VersionBrowser />;
      case "monitoring": return <MonitoringDashboard />;
      case "selfedit": return <SelfEditPanel />;
      case "sandbox": return <ComponentSandbox />;
      default: return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-knit-bg text-knit-text">
      <header className="flex items-center justify-between h-12 px-4 bg-knit-bg-alt border-b border-knit-border shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="text-knit-text-muted hover:text-white text-xs px-2 py-1 rounded hover:bg-knit-bg-hover transition"
          >
            ← Dashboard
          </button>
          <span className="text-white font-bold text-base ml-2">knitstudio</span>
          <span className="text-knit-text-muted text-xs">{projectId.slice(0, 8)}</span>
          <div className="ml-3">
            <SaveIndicator />
          </div>
        </div>

        <div className="flex items-center gap-1 bg-knit-bg rounded-lg p-0.5 border border-knit-border">
          <button
            onClick={() => setMode("simple")}
            className={`px-3 py-1 text-xs rounded-md transition ${
              mode === "simple"
                ? "bg-knit-primary text-white"
                : "text-knit-text-muted hover:text-white"
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => setMode("advanced")}
            className={`px-3 py-1 text-xs rounded-md transition ${
              mode === "advanced"
                ? "bg-knit-primary text-white"
                : "text-knit-text-muted hover:text-white"
            }`}
          >
            Advanced
          </button>
        </div>

          <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSearch(true)}
            className="px-2 py-1.5 text-xs text-knit-text-muted hover:text-white rounded-md hover:bg-knit-bg-hover transition"
            title="Search (Cmd+K)"
          >
            🔍
          </button>
          <SandboxButton />
          {panelConfig.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePanel(p.id)}
              className={`px-3 py-1.5 text-xs rounded-md transition ${
                activePanel === p.id
                  ? "bg-knit-primary text-white"
                  : "text-knit-text-muted hover:text-white hover:bg-knit-bg-hover"
              }`}
            >
              {p.label}
            </button>
          ))}
          {/* Quick actions */}
          <button onClick={() => setShowGallery(true)} className="ml-1 px-2 py-1.5 text-xs text-knit-text-muted hover:text-white rounded-md hover:bg-knit-bg-hover transition" title="Showcase">🖼</button>
          <button onClick={() => setShowChangelog(true)} className="px-2 py-1.5 text-xs text-knit-text-muted hover:text-white rounded-md hover:bg-knit-bg-hover transition" title="Changelog">📋</button>
          <button onClick={() => setShowRoadmap(true)} className="px-2 py-1.5 text-xs text-knit-text-muted hover:text-white rounded-md hover:bg-knit-bg-hover transition" title="Roadmap">🗺</button>
          <button onClick={() => setShowFeedback(true)} className="px-2 py-1.5 text-xs text-knit-text-muted hover:text-white rounded-md hover:bg-knit-bg-hover transition" title="Feedback">💬</button>
          <button onClick={() => setShowSettings(true)} className="px-2 py-1.5 text-xs text-knit-text-muted hover:text-white rounded-md hover:bg-knit-bg-hover transition" title="Settings">⚙</button>
          <span className="w-px h-4 bg-knit-border mx-1" />
          <button onClick={() => setShowHelp(true)} className="px-2 py-1.5 text-xs text-knit-text-muted hover:text-white rounded-md hover:bg-knit-bg-hover transition" title="Help Center — F1 — docs.knitstudio.io">❓</button>
          {panelConfig.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePanel(p.id)}
              className={`px-3 py-1.5 text-xs rounded-md transition ${
                activePanel === p.id
                  ? "bg-knit-primary text-white"
                  : "text-knit-text-muted hover:text-white hover:bg-knit-bg-hover"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setShowShortcuts(true)}
            className="ml-1 px-2 py-1.5 text-xs text-knit-text-muted hover:text-white rounded-md hover:bg-knit-bg-hover transition"
            title="Keyboard shortcuts (?)"
          >
            ⌨
          </button>
          <button
            onClick={() => setShowGridSettings(true)}
            className="ml-1 px-2 py-1.5 text-xs text-knit-text-muted hover:text-white rounded-md hover:bg-knit-bg-hover transition"
            title="Grid settings"
          >
            ⊞
          </button>
          <button
            onClick={handlePublish}
            className="ml-1 px-3 py-1.5 text-xs rounded-md bg-knit-primary text-white hover:bg-knit-primary-hover transition"
          >
            Publish
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {activePanel === "actions" ? (
          <ActionFlowPanel />
        ) : (
          <>
            {activePanel && (
              <Panel title={panelConfig.find((p) => p.id === activePanel)?.label ?? ""} width={240}>
                {renderPanelContent()}
              </Panel>
            )}
            <div className="flex-1 relative">
              <GridOverlay />
              <BuilderCanvas />
            </div>
          </>
        )}
      </div>

      {/* Simple mode wizard on first publish */}
      {showWizard && (
        <WizardModal
          title="Create a new page"
          steps={createPageSteps}
          onComplete={() => {
            setShowWizard(false);
            addToast({ type: "success", message: "Page created!" });
          }}
          onClose={() => setShowWizard(false)}
        />
      )}

      {showShortcuts && <ShortcutsPanel onClose={() => setShowShortcuts(false)} />}
      {showGridSettings && <GridSettingsModal onClose={() => setShowGridSettings(false)} />}
      {showChangelog && <ChangelogModal onClose={() => setShowChangelog(false)} />}
      {showRoadmap && <RoadmapModal onClose={() => setShowRoadmap(false)} />}
      {showFeedback && <FeedbackPanel onClose={() => setShowFeedback(false)} />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
      {showGallery && <ShowcaseGallery onSelect={(name) => { addToast({ type: "info", message: `Loading template: ${name}` }); setShowGallery(false); }} onClose={() => setShowGallery(false)} />}
      {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}
      <OnboardingOverlay />
      {sandboxMode && <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-yellow-700 text-white px-4 py-1 rounded-b-lg text-xs">🏖️ Sandbox mode — changes won't be saved</div>}
    </div>
  );
}
