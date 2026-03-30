"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

type Session = {
  id: string;
  ip?: string;
  userAgent?: string;
  createdAt?: string;
};

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  /* --------------------------
     LOAD SESSIONS
  -------------------------- */
  async function loadSessions() {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      setSessions(data.sessions || []);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSessions();
  }, []);

  /* --------------------------
     REVOKE SESSION
  -------------------------- */
  async function revoke(sessionId: string) {
    await fetch("/api/auth/session", {
      method: "DELETE",
      body: JSON.stringify({ sessionId }),
    });

    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  }

  /* --------------------------
     DEVICE PARSER (UPGRADED)
  -------------------------- */
  function getDevice(ua?: string) {
    if (!ua) return "Unknown device";

    if (ua.includes("iPhone")) return "📱 iPhone";
    if (ua.includes("Android")) return "📱 Android";
    if (ua.includes("Mac")) return "💻 Mac";
    if (ua.includes("Windows")) return "💻 Windows";
    if (ua.includes("Linux")) return "💻 Linux";

    return "💻 Device";
  }

  /* --------------------------
     CURRENT DEVICE CHECK
  -------------------------- */
  function isCurrentSession(s: Session) {
    if (typeof window === "undefined") return false;
    return s.userAgent === navigator.userAgent;
  }

  /* --------------------------
     TEMP GEO (replace later)
  -------------------------- */
  function getCoordsFromIP(ip?: string) {
    return {
      lat: 51.5074,
      lng: -0.1278,
    };
  }

  return (
    <div className="p-6 text-white space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">
          🔐 Security & Devices
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Manage your active sessions and device access
        </p>
      </div>

      {loading && <div className="text-white/40">Loading sessions...</div>}

      {/* EMPTY STATE */}
      {!loading && sessions.length === 0 && (
        <div className="text-white/40">No active sessions</div>
      )}

      {/* SESSIONS */}
      <div className="grid md:grid-cols-2 gap-6">
        {sessions.map((s) => {
          const coords = getCoordsFromIP(s.ip);
          const current = isCurrentSession(s);

          return (
            <div
              key={s.id}
              className={`p-4 rounded-lg border space-y-4 transition
              ${
                current
                  ? "border-green-400 bg-green-500/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-medium">
                    {getDevice(s.userAgent)}
                  </div>

                  {current && (
                    <div className="text-xs text-green-400">
                      ● Current device
                    </div>
                  )}

                  <div className="text-xs text-white/40 mt-1 break-all">
                    {s.userAgent}
                  </div>
                </div>

                {!current && (
                  <button
                    onClick={() => revoke(s.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Revoke
                  </button>
                )}
              </div>

              {/* META */}
              <div className="text-sm text-white/70 space-y-1">
                <div>🌐 IP: {s.ip || "Unknown"}</div>

                <div className="text-xs text-white/40">
                  {s.createdAt
                    ? new Date(s.createdAt).toLocaleString()
                    : ""}
                </div>
              </div>

              {/* MAP */}
              <div className="rounded overflow-hidden border border-white/10">
                <Map lat={coords.lat} lng={coords.lng} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}