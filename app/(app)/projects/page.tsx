"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  /* ================= LOAD PROJECTS ================= */
  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data || []);
    } catch {
      setProjects([]);
    }
  }

  /* ================= CREATE PROJECT ================= */
  async function createProject() {
    if (!name) return;

    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    const project = await res.json();

    setShowModal(false);
    setName("");

    // redirect to workspace
    router.push(`/projects/${project.id}/workspace`);
  }

  return (
    <div style={{
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ fontSize: "26px", fontWeight: "bold" }}>
          📁 Projects
        </h1>

        <button
          onClick={() => setShowModal(true)}
          style={{
            background: "#7c3aed",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer"
          }}
        >
          ➕ New Project
        </button>
      </div>

      {/* PROJECT GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "20px"
      }}>
        {projects.length === 0 && (
          <div style={{ color: "#777" }}>
            No projects yet. Create one 🚀
          </div>
        )}

        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => router.push(`/projects/${p.id}/workspace`)}
            style={{
              padding: "20px",
              borderRadius: "10px",
              background: "#0f0f17",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer"
            }}
          >
            <div style={{ fontWeight: "600" }}>{p.name}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              Open workspace →
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>

            <h2 style={{ marginBottom: "16px" }}>
              Create Project
            </h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              style={inputStyle}
            />

            <div style={{
              display: "flex",
              gap: "10px",
              marginTop: "16px"
            }}>
              <button onClick={createProject} style={primaryBtn}>
                Create
              </button>

              <button
                onClick={() => setShowModal(false)}
                style={secondaryBtn}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const modalStyle: React.CSSProperties = {
  background: "#0f0f17",
  padding: "24px",
  borderRadius: "12px",
  width: "320px",
  border: "1px solid rgba(255,255,255,0.08)"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "#00000055",
  color: "white"
};

const primaryBtn: React.CSSProperties = {
  flex: 1,
  padding: "10px",
  background: "#7c3aed",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const secondaryBtn: React.CSSProperties = {
  flex: 1,
  padding: "10px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};