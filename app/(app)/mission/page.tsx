"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

export default function MissionPage() {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("oix_user")
      : null;

  /* ---------------- AUTH ---------------- */
  if (typeof window !== "undefined") {
    const user = getUser();
    if (!user) router.push("/login");
  }

  /* ---------------- RUN ---------------- */
  const run = async () => {
    if (!input.trim()) return;

    setOutput("");
    setLoading(true);

    const res = await fetch("/api/missions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user": userId || "",
      },
      body: JSON.stringify({ input }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      setOutput((prev) => prev + chunk);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold">OIX Live Agents</h1>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your mission..."
          className="flex-1 p-3 rounded bg-black/60 outline-none"
        />
        <button
          onClick={run}
          className="px-4 bg-purple-500 rounded"
        >
          Run
        </button>
      </div>

      {/* LIVE STREAM OUTPUT */}
      <div className="bg-black/60 p-4 rounded min-h-[300px] whitespace-pre-wrap text-sm">
        {loading && <p className="text-purple-400">⚡ Agents running...</p>}
        {output}
      </div>

    </div>
  );
}