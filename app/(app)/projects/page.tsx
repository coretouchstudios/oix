"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  repo?: string;
  createdAt?: string;
  deploymentUrl?: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);

  /* --------------------------
     LOAD PROJECTS
  -------------------------- */
  async function loadProjects() {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  /* --------------------------
     CREATE PROJECT
  -------------------------- */
  async function createProject() {
    if (!name) return;

    setLoading(true);

    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, repo }),
      });

      setName("");
      setRepo("");
      loadProjects();
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  /* --------------------------
     DEPLOY PROJECT
  -------------------------- */
  async function deploy(project: Project) {
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
          repo: project.repo,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("🚀 Deployed!");
        loadProjects();
      } else {
        alert("❌ Deploy failed");
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="p-8 text-white max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Projects</h1>

        <button
          onClick={() => {
            document.getElementById("create-modal")?.classList.remove("hidden");
          }}
          className="bg-purple-600 px-4 py-2 rounded"
        >
          + New Project
        </button>
      </div>

      {/* PROJECT GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">{p.name}</h2>
              <span className="text-xs text-white/40">
                {p.createdAt
                  ? new Date(p.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>

            {p.repo && (
              <div className="text-xs text-blue-400 mt-1 truncate">
                {p.repo}
              </div>
            )}

            {p.deploymentUrl && (
              <a
                href={p.deploymentUrl}
                target="_blank"
                className="text-green-400 text-sm mt-2 block"
              >
                🌍 Live
              </a>
            )}

            {/* ACTIONS */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => deploy(p)}
                className="flex-1 bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
              >
                Deploy
              </button>

              <button
                className="flex-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm"
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {projects.length === 0 && (
        <div className="text-center text-white/40 mt-20">
          No projects yet — create your first one 🚀
        </div>
      )}

      {/* =========================
         CREATE MODAL
      ========================= */}
      <div
        id="create-modal"
        className="hidden fixed inset-0 bg-black/70 flex items-center justify-center"
      >
        <div className="bg-[#0a0a0c] border border-white/10 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl mb-4">Create Project</h2>

          <input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-2 bg-black border border-white/10 rounded"
          />

          <input
            placeholder="GitHub repo (optional)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="w-full mb-4 p-2 bg-black border border-white/10 rounded"
          />

          <div className="flex gap-2">
            <button
              onClick={createProject}
              className="flex-1 bg-purple-600 p-2 rounded"
            >
              {loading ? "Creating..." : "Create"}
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("create-modal")
                  ?.classList.add("hidden")
              }
              className="flex-1 bg-white/10 p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}