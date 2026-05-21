import { useEffect, useRef } from "react";
import grapesjs, { type Editor } from "grapesjs";
import DOMPurify from "dompurify";
import "grapesjs/dist/css/grapes.min.css";

export interface KnitCanvasProps {
  projectId?: string;
  pageId?: string;
  className?: string;
  onReady?: (editor: Editor) => void;
}

export function KnitCanvas({ projectId, pageId, className, onReady }: KnitCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (!containerRef.current || editorRef.current) return;

    const editor = grapesjs.init({
      container: containerRef.current,
      fromElement: false,
      height: "100%",
      width: "100%",
      storageManager: false,
      undoManager: { maximumStackLength: 200 },
      selectorManager: { componentFirst: true },
      canvas: { styles: [`* { outline: 1px solid rgba(79,70,229,0.15) }`] },
      styleManager: {
        sectors: [
          {
            name: "General",
            open: false,
            buildProps: ["float", "display", "position", "top", "right", "bottom", "left"],
          },
          {
            name: "Flex",
            open: false,
            buildProps: [
              "flex-direction", "flex-wrap", "justify-content",
              "align-items", "align-content", "order",
              "flex-basis", "flex-grow", "flex-shrink",
            ],
          },
          {
            name: "Dimension",
            open: false,
            buildProps: ["width", "height", "max-width", "min-height", "margin", "padding"],
          },
          {
            name: "Typography",
            open: false,
            buildProps: [
              "font-family", "font-size", "font-weight", "letter-spacing",
              "color", "line-height", "text-align", "text-decoration", "text-shadow",
            ],
          },
          {
            name: "Decorations",
            open: false,
            buildProps: ["border-radius", "border", "box-shadow", "background"],
          },
        ],
      },
    });

    editorRef.current = editor;

    // Sanitize HTML via DOMPurify when components are parsed
    editor.on("component:create", (component: any) => {
      if (component.getInnerHTML) {
        const html = component.getInnerHTML();
        if (html) {
          const clean = DOMPurify.sanitize(html);
          if (clean !== html && component.components) {
            const parsed = editor.Parser.parseHtml(clean);
            component.components(parsed);
          }
        }
      }
    });

    editor.on("load", () => {
      onReady?.(editor);
    });

    editor.DomComponents.addType("knit-component", {
      isComponent: (el) => el.tagName === "KNIT-COMPONENT",
      model: {
        defaults: {
          tagName: "div",
          draggable: true,
          droppable: true,
          attributes: { "data-knit": "true" },
          styles: `min-height: 40px; padding: 12px; border: 1px dashed #ccc;`,
        },
      },
    });

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, [projectId, pageId, onReady]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: "100%", width: "100%" }}
    />
  );
}
