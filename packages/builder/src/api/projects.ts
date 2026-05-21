const BASE = "/api";

export interface Project {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE}/projects`);
  const data = await res.json();
  return data.projects ?? [];
}

export async function createProject(name: string, type = "web"): Promise<Project> {
  const res = await fetch(`${BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type }),
  });
  const data = await res.json();
  return data.project;
}

export async function deleteProject(id: string): Promise<void> {
  await fetch(`${BASE}/projects/${id}`, { method: "DELETE" });
}
