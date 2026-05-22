import { useState, useEffect } from "react";
import { fetchProjects, createProject, deleteProject } from "../api/projects";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSelector } from "../components/LanguageSelector";
import { useI18n } from "../i18n";

interface ProjectItem {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface DashboardProps {
  onOpenProject: (id: string) => void;
}

export function Dashboard({ onOpenProject }: DashboardProps) {
  const { t } = useI18n();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    const project = await createProject(newName.trim());
    setProjects((prev) => [project, ...prev]);
    setNewName("");
    setShowNew(false);
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-knit-bg text-knit-text p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-knit-text">knitstudio</h1>
            <p className="text-knit-text-muted text-sm mt-1">{t("app.tagline")}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNew(!showNew)}
              className="px-4 py-2 bg-knit-primary text-white rounded-lg text-sm hover:bg-knit-primary-hover transition"
            >
              + New Project
            </button>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>

        {/* New project form */}
        {showNew && (
          <div className="bg-knit-bg-alt border border-knit-border rounded-lg p-4 mb-6">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder={t("project.name")}
              className="w-full px-3 py-2 bg-knit-bg border border-knit-border rounded-md text-sm text-knit-text placeholder-knit-text-muted focus:outline-none focus:border-knit-primary mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="px-3 py-1.5 bg-knit-primary text-white rounded-md text-xs"
              >
                Create
              </button>
              <button
                onClick={() => setShowNew(false)}
                className="px-3 py-1.5 text-knit-text-muted rounded-md text-xs hover:text-knit-text"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Welcome / empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🧶</div>
            <h2 className="text-xl font-semibold text-knit-text mb-2">{t("project.empty.title")}</h2>
            <p className="text-knit-text-muted text-sm mb-6 max-w-md mx-auto">
              {t("project.empty.desc")} visual applications with drag & drop,
              action flows, and data binding.
            </p>
            <button
              onClick={() => setShowNew(true)}
              className="px-6 py-2.5 bg-knit-primary text-white rounded-lg text-sm hover:bg-knit-primary-hover transition"
            >
              {t("project.empty.cta")}
            </button>
          </div>
        )}

        {/* Project list */}
        {loading && (
          <div className="text-center py-20 text-knit-text-muted text-sm">{t("search.loading")}</div>
        )}

        <div className="grid gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between bg-knit-bg-alt border border-knit-border rounded-lg p-4 hover:border-knit-primary/50 transition cursor-pointer group"
              onClick={() => onOpenProject(project.id)}
            >
              <div>
                <h3 className="text-sm font-medium text-knit-text">{project.name}</h3>
                <p className="text-xs text-knit-text-muted mt-0.5">
                  {project.type} · {new Date(project.updated_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project.id);
                }}
                className="text-knit-text-muted hover:text-red-400 text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
