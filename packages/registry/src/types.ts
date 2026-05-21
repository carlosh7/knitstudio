export interface ComponentDefinition {
  type: string;
  name: string;
  category: string;
  targets: Array<"web" | "react" | "react-native" | "vue">;
  props: PropDefinition[];
  defaultStyles?: Record<string, string>;
  icon?: string;
}

export interface PropDefinition {
  name: string;
  label: string;
  type: "string" | "number" | "boolean" | "select" | "color" | "icon";
  default?: unknown;
  options?: Array<{ label: string; value: string }>;
}
