import type { Editor } from "grapesjs";

export interface EditorConfig {
  projectId?: string;
  pageId?: string;
  storageType?: "local" | "remote";
  plugins?: string[];
  onReady?: (editor: Editor) => void;
  onSave?: (projectData: unknown) => void;
}
