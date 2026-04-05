"use client";

import { useState } from "react";

export default function AppLayout({ children }: any) {
  const [aiOpen, setAiOpen] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#0b0b0f",
        color: "white",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: "240px",
          background: "#0f0f17",
          borderRight: "1px solid #222",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 🔥 LOGO (IMAGE + GLOW + HOVER) */}
        <div style={{ padding: "20px" }}>
          <img
            src="/logo.png"
            alt="OIX Logo"
            style={{
              width: "140px",
              filter: "drop-shadow(0 0 12px rgba(124,58,237,0.6))",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.filter =
                "drop-shadow(0 0 20px rgba(34,211,238,0.9))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter =
                "drop-shadow(0 0 12px rgba(124,58,237,0.6))";
            }}
          />
        </div>

        {/* NAV */}
        <div style={{ padding: "10px", cursor: "pointer" }}>Mission</div>
        <div style={{ padding: "10px", cursor: "pointer" }}>Projects</div>
        <div style={{ padding: "10px", cursor: "pointer" }}>Agents</div>

        <div style={{ marginTop: "auto", padding: "10px", fontSize: "12px", color: "#666" }}>
          OIX v2.0 ⚡
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* TOPBAR */}
        <header
          style={{
            height: "60px",
            borderBottom: "1px solid #222",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <div>OIX Workspace</div>

          <button
            onClick={() => setAiOpen(!aiOpen)}
            style={{
              background: "#7C3AED",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
            }}
          >
            AI
          </button>
        </header>

        {/* BODY */}
        <div style={{ flex: 1, display: "flex" }}>
          <main style={{ flex: 1, padding: "20px" }}>{children}</main>

          {aiOpen && (
            <aside
              style={{
                width: "300px",
                borderLeft: "1px solid #222",
                padding: "10px",
                background: "#0f0f17",
              }}
            >
              🤖 AI Panel
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}