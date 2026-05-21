import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { useKnitEditor } from "./KnitEditorProvider";
export function KnitCanvas({ projectId, pageId, className }) {
    const containerRef = useRef(null);
    const editorRef = useRef(null);
    const { setEditor } = useKnitEditor();
    useEffect(() => {
        if (!containerRef.current || editorRef.current)
            return;
        const editor = grapesjs.init({
            container: containerRef.current,
            fromElement: false,
            height: "100%",
            width: "100%",
            storageManager: false,
            undoManager: { maximumStackLength: 50 },
            selectorManager: { componentFirst: true },
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
                            "flex-direction",
                            "flex-wrap",
                            "justify-content",
                            "align-items",
                            "align-content",
                            "order",
                            "flex-basis",
                            "flex-grow",
                            "flex-shrink",
                        ],
                    },
                    {
                        name: "Dimension",
                        open: false,
                        buildProps: [
                            "width",
                            "height",
                            "max-width",
                            "min-height",
                            "margin",
                            "padding",
                        ],
                    },
                    {
                        name: "Typography",
                        open: false,
                        buildProps: [
                            "font-family",
                            "font-size",
                            "font-weight",
                            "letter-spacing",
                            "color",
                            "line-height",
                            "text-align",
                            "text-decoration",
                            "text-shadow",
                        ],
                    },
                    {
                        name: "Decorations",
                        open: false,
                        buildProps: [
                            "border-radius",
                            "border",
                            "box-shadow",
                            "background",
                        ],
                    },
                ],
            },
        });
        editorRef.current = editor;
        editor.on("load", () => {
            setEditor(editor);
        });
        // Default component
        editor.DomComponents.addType("knit-component", {
            isComponent: (el) => el.tagName === "KNIT-COMPONENT",
            model: {
                defaults: {
                    tagName: "div",
                    draggable: true,
                    droppable: true,
                    attributes: { "data-knit": "true" },
                    styles: `
            min-height: 40px;
            padding: 12px;
            border: 1px dashed #ccc;
          `,
                },
            },
        });
        return () => {
            editor.destroy();
            editorRef.current = null;
        };
    }, [projectId, pageId, setEditor]);
    return (_jsx("div", { ref: containerRef, className: className, style: { height: "100%", width: "100%" } }));
}
//# sourceMappingURL=KnitCanvas.js.map