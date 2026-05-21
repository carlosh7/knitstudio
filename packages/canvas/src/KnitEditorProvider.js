import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, } from "react";
const KnitEditorContext = createContext(null);
export function KnitEditorProvider({ children }) {
    const [editor, setEditor] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const handleSetEditor = useCallback((ed) => {
        setEditor(ed);
        setIsReady(true);
    }, []);
    return (_jsx(KnitEditorContext.Provider, { value: { editor, setEditor: handleSetEditor, isReady }, children: children }));
}
export function useKnitEditor() {
    const ctx = useContext(KnitEditorContext);
    if (!ctx) {
        throw new Error("useKnitEditor must be used within KnitEditorProvider");
    }
    return ctx;
}
//# sourceMappingURL=KnitEditorProvider.js.map