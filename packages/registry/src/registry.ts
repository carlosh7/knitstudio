import type { ComponentDefinition } from "./types";

const components = new Map<string, ComponentDefinition>();

export function registerComponent(def: ComponentDefinition) {
  if (components.has(def.type)) {
    console.warn(`[registry] Component "${def.type}" already registered, skipping`);
    return;
  }
  components.set(def.type, def);
}

export function getComponent(type: string): ComponentDefinition | undefined {
  return components.get(type);
}

export function getAllComponents(): ComponentDefinition[] {
  return Array.from(components.values());
}

export function getComponentsByTarget(target: string): ComponentDefinition[] {
  return Array.from(components.values()).filter((c) => c.targets.includes(target as never));
}
