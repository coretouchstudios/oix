export const runtime = "nodejs";

/* =========================
   🚀 DEPLOY LOG STREAM (SSE)
========================= */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return new Response("Missing projectId", { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      let count = 0;

      const encoder = new TextEncoder();

      const send = (msg: string) => {
        controller.enqueue(encoder.encode(`data: ${msg}\n\n`));
      };

      // 🔥 MOCK LOGS (replace with real Docker logs later)
      const logs = [
        "🔧 Initializing deployment...",
        "📦 Installing dependencies...",
        "⚙️ Building project...",
        "🚀 Starting container...",
        "🌍 Assigning domain...",
        "✅ Deployment complete!",
      ];

      const interval = setInterval(() => {
        if (count < logs.length) {
          send(logs[count]);
          count++;
        } else {
          clearInterval(interval);
          controller.close();
        }
      }, 800);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}