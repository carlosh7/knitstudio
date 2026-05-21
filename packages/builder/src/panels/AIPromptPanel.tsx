import { useState } from "react";
import { useBuilderStore } from "../store/useBuilderStore";
import { useUIStore } from "../store/useUIStore";
import { createAIProvider } from "@knitstudio/ai";

export function AIPromptPanel() {
  const editor = useBuilderStore((s) => s.editor);
  const addToast = useUIStore((s) => s.addToast);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (!editor) {
      addToast({ type: "error", message: "Editor not ready" });
      return;
    }

    const apiKey = localStorage.getItem("knitstudio-openai-key");
    if (!apiKey) {
      addToast({ type: "warning", message: "Set your OpenAI key in Settings first", action: { label: "Configure", onClick: () => {} } });
      return;
    }

    setLoading(true);
    try {
      const provider = createAIProvider("openai", apiKey);
      const schema = await provider.generateLayout(prompt);
      const hasContent = schema.pages.length > 0;
      if (hasContent) {
        const html = schema.pages.map((p) => {
          const node = p.root;
          if (node.type === "container" && node.props?.content) return String(node.props.content);
          if (node.type === "text" && node.props?.content) return String(node.props.content);
          return `<div>${node.type}</div>`;
        }).join("\n");
        editor.setComponents(html);
        addToast({ type: "success", message: "AI-generated layout added to canvas" });
        setPrompt("");
      } else {
        addToast({ type: "error", message: "AI returned empty response" });
      }
    } catch {
      addToast({ type: "error", message: "AI generation failed. Check your API key." });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-sm font-medium">AI Generate</h3>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe the UI you want...&#10;e.g. 'a login form with email and password fields, dark theme'"
        rows={4}
        className="w-full px-3 py-2 bg-knit-bg border border-knit-border rounded-lg text-sm text-white placeholder-knit-text-muted resize-none focus:outline-none focus:border-knit-primary"
      />

      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`flex-1 px-3 py-1.5 text-xs rounded-lg transition ${
            loading ? "bg-knit-bg-alt text-knit-text-muted" : "bg-knit-primary text-white hover:bg-knit-primary-hover"
          }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="text-xs text-knit-text-muted">
        <p>Press Enter to generate. Shift+Enter for new line.</p>
        <p className="mt-1">
          API key stored locally in your browser. Set it in{" "}
          <button className="text-knit-primary hover:underline">Settings → AI</button>.
        </p>
      </div>
    </div>
  );
}
