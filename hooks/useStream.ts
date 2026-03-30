import { useState } from "react";

export function useStream() {
  const [planner, setPlanner] = useState("");
  const [executor, setExecutor] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async (message: string) => {
    setPlanner("");
    setExecutor("");
    setReviewer("");
    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    let mode: "planner" | "executor" | "reviewer" = "planner";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);

      if (chunk.includes("[PLANNER]")) {
        mode = "planner";
        continue;
      }

      if (chunk.includes("[EXECUTOR]")) {
        mode = "executor";
        continue;
      }

      if (chunk.includes("[REVIEWER]")) {
        mode = "reviewer";
        continue;
      }

      if (mode === "planner") {
        setPlanner((p) => p + chunk);
      } else if (mode === "executor") {
        setExecutor((p) => p + chunk);
      } else {
        setReviewer((p) => p + chunk);
      }
    }

    setLoading(false);
  };

  return { planner, executor, reviewer, loading, run };
}