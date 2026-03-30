import { tavily } from "tavily";

const client = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export async function runTool(name: string, input: string) {
  // -------------------------
  // 🌐 REAL WEB SEARCH (TAVILY)
  // -------------------------
  if (name === "search") {
    try {
      const res = await client.search({
        query: input,
        search_depth: "advanced",
        max_results: 5,
      });

      // 🔥 Enhance results for UI (Perplexity-style)
      const enhanced = res.results.map((r: any) => {
        let domain = "";
        try {
          domain = new URL(r.url).hostname;
        } catch {}

        return {
          title: r.title,
          content: r.content,
          url: r.url,
          domain,

          // 🔥 favicon (Google service)
          favicon: `https://www.google.com/s2/favicons?domain=${domain}`,
        };
      });

      // ✅ Return structured JSON (IMPORTANT)
      return JSON.stringify({
        type: "search_results",
        data: enhanced,
      });
    } catch (err) {
      console.error("Tavily error:", err);
      return JSON.stringify({
        type: "error",
        message: "Search failed.",
      });
    }
  }

  // -------------------------
  // 🧮 CALCULATOR
  // -------------------------
  if (name === "calculator") {
    try {
      const result = Function(`"use strict"; return (${input})`)();

      return JSON.stringify({
        type: "calculation",
        result,
      });
    } catch {
      return JSON.stringify({
        type: "error",
        message: "Invalid calculation.",
      });
    }
  }

  return JSON.stringify({
    type: "error",
    message: "Unknown tool.",
  });
}