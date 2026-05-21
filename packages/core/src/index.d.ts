export { uuid } from "./uuid";
export type ComponentType = string;
export interface ComponentNode {
    type: string;
    key: string;
    props?: Record<string, unknown>;
    styles?: StylesDefinition;
    children?: ComponentNode[];
    actions?: Record<string, ActionFlow>;
    bindings?: Record<string, string>;
    condition?: string;
    repeat?: RepeatDefinition;
}
export interface StylesDefinition {
    base: Record<string, string>;
    responsive?: Array<{
        breakpoint: string;
        styles: Record<string, string>;
    }>;
    platform?: Record<string, Record<string, string>>;
}
export interface ActionFlow {
    trigger: string;
    steps: ActionStep[];
    debounce?: number;
}
export interface ActionStep {
    type: "apiCall" | "navigate" | "setVariable" | "showToast" | "showDialog" | "refresh" | "condition" | "loop" | "delay" | "tryCatch" | "code" | "dispatchEvent";
}
export interface RepeatDefinition {
    source: string;
    as: string;
}
export interface PageDefinition {
    id: string;
    route: string;
    title: string;
    meta?: {
        description?: string;
        auth?: boolean;
        roles?: string[];
    };
    bindings?: Record<string, unknown>;
    root: ComponentNode;
}
export interface AppSchema {
    $schema: SchemaVersion;
    theme: Theme;
    variables: VariableDefinitions;
    templates: Record<string, TemplateDefinition>;
    pages: PageDefinition[];
}
export interface SchemaVersion {
    version: string;
    targets: string[];
    meta?: Record<string, unknown>;
}
export interface Theme {
    colors?: Record<string, string>;
    typography?: Record<string, unknown>;
    spacing?: Record<string, string>;
    breakpoints?: Record<string, number>;
    shadows?: Record<string, string>;
    borderRadius?: Record<string, string>;
}
export interface VariableDefinitions {
    global?: Record<string, VariableDef>;
}
export interface VariableDef {
    type: "string" | "number" | "boolean" | "object" | "array";
    default?: unknown;
}
export interface TemplateDefinition {
    root: ComponentNode;
}
//# sourceMappingURL=index.d.ts.map