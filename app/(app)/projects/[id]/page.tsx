"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Deployment = {
  id: string;
  status: "idle" | "building" | "live" | "error";
  url?: string;
  createdAt?: string;
};

type Project = {
  id: string;
  name: string;
  repo?: string;
  deployments: Deployment[];
};

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  /* --------------------------
     LOAD PROJECT
  -------------------------- */
  async function loadProject() {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      setProject(data.project);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (projectId) loadProject();
  }, [projectId]);

  /* --------------------------
     DEPLOY
  -------------------------- */
  async function deploy() {
    setLogs([]);
    setShowLogs(true);

    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        body: JSON.stringify({ projectId }),
      });

      const data = await res.json();

      if (data.success) {
        loadProject();
      }
    } catch (e) {
      console.error(e);
    }
  }

  /* --------------------------
     STREAM LOGS (SSE)
  -------------------------- */
  function streamLogs() {
    const eventSource = new EventSource(
      `/api/deploy/logs?projectId=${projectId}`
    );

    eventSource.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };
  }

  useEffect(() => {
    if (showLogs) {
      streamLogs();
    }
  }, [showLogs]);

  if (!project) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  const latest = project.deployments?.[0];

  return (
    <div className="p-8 text-white max-w-6xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">{project.name}</h1>

          {/* TEAM BADGE */}
          <span className="text-xs bg-blue-500/20 px-2 rounded ml-2">
            Team
          </span>

          {project.repo && (
            <div className="text-sm text-blue-400 mt-1">
              {project.repo}
            </div>
          )}
        </div>

        <button
          onClick={deploy}
          className="bg-green-600 px-4 py-2 rounded"
        >
          🚀 Deploy
        </button>
      </div>

      {/* STATUS */}
      {latest && (
        <div className="p-4 bg-white/5 border border-white/10 rounded">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-white/40">
                Latest Deployment
              </div>

              <div
                className={`text-lg mt-1 ${
                  latest.status === "live"
                    ? "text-green-400"
                    : latest.status === "building"
                    ? "text-yellow-400"
                    : latest.status === "error"
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {latest.status.toUpperCase()}
              </div>
            </div>

            {latest.url && (
              <a
                href={latest.url}
                target="_blank"
                className="text-green-400"
              >
                🌍 Open
              </a>
            )}
          </div>
        </div>
      )}

      {/* DEPLOYMENTS LIST */}
      <div>
        <h2 className="text-xl mb-4">Deployments</h2>

        <div className="space-y-3">
          {project.deployments?.map((d) => (
            <div
              key={d.id}
              className="p-3 bg-white/5 border border-white/10 rounded flex justify-between items-center"
            >
              <div>
                <div className="text-sm">
                  {d.status.toUpperCase()}
                </div>
                <div className="text-xs text-gray-400">
                  {d.createdAt
                    ? new Date(d.createdAt).toLocaleString()
                    : ""}
                </div>
              </div>

              {d.url && (
                <a
                  href={d.url}
                  target="_blank"
                  className="text-green-400 text-sm"
                >
                  Open
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* =========================
         LOGS MODAL
      ========================= */}
      {showLogs && (
        <div className="fixed inset-0 bg-black/80 flex flex-col">
          <div className="p-4 flex justify-between items-center border-b border-white/10">
            <div>🚀 Deployment Logs</div>

            <button
              onClick={() => setShowLogs(false)}
              className="text-red-400"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
            {logs.map((log, i) => (
              <div key={i} className="mb-1">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}