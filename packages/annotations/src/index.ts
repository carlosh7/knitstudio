export interface Annotation {
  id: string;
  pageId: string;
  elementId: string;
  type: "comment" | "bug" | "suggestion" | "approved";
  content: string;
  resolved: boolean;
  createdAt: string;
  createdBy: string;
  rect: { x: number; y: number; width: number; height: number };
}

const annotations = new Map<string, Annotation[]>();

export function addAnnotation(pageId: string, annotation: Omit<Annotation, "id" | "createdAt">): Annotation {
  const ann: Annotation = {
    ...annotation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  if (!annotations.has(pageId)) {
    annotations.set(pageId, []);
  }
  annotations.get(pageId)!.push(ann);
  return ann;
}

export function resolveAnnotation(pageId: string, id: string): void {
  const pageAnns = annotations.get(pageId);
  if (!pageAnns) return;
  const ann = pageAnns.find((a) => a.id === id);
  if (ann) ann.resolved = true;
}

export function getAnnotations(pageId: string): Annotation[] {
  return annotations.get(pageId) || [];
}

export function getPendingAnnotations(pageId: string): Annotation[] {
  return (annotations.get(pageId) || []).filter((a) => !a.resolved);
}
