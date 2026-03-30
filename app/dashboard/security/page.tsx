"use client";

import { useEffect, useState } from "react";

export default function SecurityPage() {
  const [sessions, setSessions] = useState<any[]>([]);

  async function load() {
    const res = await fetch("/api/auth/sessions");
    const data = await res.json();
    setSessions(data.sessions || []);
  }

  async function revoke(id: string) {
    await fetch("/api/auth/sessions", {
      method: "DELETE",
      body: JSON.stringify({ sessionId: id }),
    });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-6">Security</h1>

      {sessions.map((s) => (
        <div
          key={s.id}
          className="border border-white/10 p-4 mb-3 rounded"
        >
          <div className="text-sm">
            🖥 {s.userAgent || "Unknown device"}
          </div>

          <div className="text-xs text-white/40">
            🌍 {s.ip || "Unknown IP"}
          </div>

          <button
            onClick={() => revoke(s.id)}
            className="text-red-400 text-xs mt-2"
          >
            Revoke
          </button>
        </div>
      ))}
    </div>
  );
}