import { type ReactNode } from "react";
import type { Editor } from "grapesjs";
interface KnitEditorContextType {
    editor: Editor | null;
    setEditor: (editor: Editor) => void;
    isReady: boolean;
}
export declare function KnitEditorProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useKnitEditor(): KnitEditorContextType;
export {};
//# sourceMappingURL=KnitEditorProvider.d.ts.map