interface Shortcut {
  keys: string;
  action: string;
}

const shortcuts: Shortcut[] = [
  { keys: "Ctrl+Z", action: "Undo" },
  { keys: "Ctrl+Shift+Z", action: "Redo" },
  { keys: "Ctrl+S", action: "Save project" },
  { keys: "Delete / Backspace", action: "Delete selected component" },
  { keys: "Ctrl+D", action: "Duplicate component" },
  { keys: "Escape", action: "Deselect / Close panel" },
  { keys: "?", action: "Toggle this shortcuts reference" },
  { keys: "Tab", action: "Focus next panel" },
];

export function ShortcutsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-knit-bg-alt border border-knit-border rounded-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Keyboard Shortcuts</h2>
          <button onClick={onClose} className="text-knit-text-muted hover:text-white text-lg">×</button>
        </div>
        <div className="space-y-2">
          {shortcuts.map((s) => (
            <div key={s.keys} className="flex items-center justify-between text-sm">
              <span className="text-knit-text-muted">{s.action}</span>
              <kbd className="px-2 py-0.5 bg-knit-bg border border-knit-border rounded text-xs text-white font-mono">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
