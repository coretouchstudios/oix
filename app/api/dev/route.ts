import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

export const runtime = "nodejs";

const BASE_PORT = 4000;

/* =========================
   🚀 START DEV SERVER
========================= */
export async function POST(req: Request) {
  const { projectId } = await req.json();

  if (!projectId) {
    return Response.json({ error: "Missing projectId" }, { status: 400 });
  }

  const port = BASE_PORT + Math.floor(Math.random() * 1000);
  const container = `oix-project-${projectId}`;

  try {
    // run dev server inside container
    await execAsync(
      `docker exec -d ${container} sh -c "npm install && npm run dev -- --port=${port} --host=0.0.0.0"`
    );

    return Response.json({
      url: `http://localhost:${port}`,
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}