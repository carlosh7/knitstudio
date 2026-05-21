import { useState, useEffect, useRef } from "react";

interface SearchResult {
  id: string;
  type: "page" | "component" | "action" | "setting";
  label: string;
  description: string;
}

const searchIndex: SearchResult[] = [
  { id: "create-page", type: "page", label: "Create new page", description: "Add a new page to your project" },
  { id: "publish", type: "action", label: "Publish project", description: "Deploy current version" },
  { id: "export", type: "action", label: "Export project", description: "Export to HTML, React, etc." },
  { id: "shortcuts", type: "setting", label: "Keyboard shortcuts", description: "View available shortcuts" },
  { id: "button", type: "component", label: "Button component", description: "Add an interactive button" },
  { id: "text", type: "component", label: "Text component", description: "Add text content" },
  { id: "container", type: "component", label: "Container", description: "Add a layout container" },
  { id: "image", type: "component", label: "Image", description: "Add an image" },
  { id: "card", type: "component", label: "Card", description: "Add a card component" },
];

interface SearchOverlayProps {
  onClose: () => void;
  onAction: (id: string) => void;
}

export function SearchOverlay({ onClose, onAction }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = query
    ? searchIndex.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchIndex;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center pt-[15vh] z-50" onClick={onClose}>
      <div
        className="bg-knit-bg-alt border border-knit-border rounded-xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-knit-border">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, components, actions..."
            className="w-full bg-transparent text-white text-sm placeholder-knit-text-muted outline-none"
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-6 text-center text-knit-text-muted text-sm">No results</div>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                onClick={() => { onAction(r.id); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-knit-bg-hover transition text-left"
              >
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                  r.type === "page" ? "bg-blue-900/50 text-blue-300" :
                  r.type === "component" ? "bg-purple-900/50 text-purple-300" :
                  r.type === "action" ? "bg-green-900/50 text-green-300" :
                  "bg-knit-bg text-knit-text-muted"
                }`}>
                  {r.type[0].toUpperCase()}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{r.label}</div>
                  <div className="text-xs text-knit-text-muted truncate">{r.description}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
