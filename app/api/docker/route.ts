import { exec } from "child_process";
import util from "util";
import path from "path";
import fs from "fs";

const run = util.promisify(exec);

export const runtime = "nodejs";

/* =========================
   🔧 CONFIG
========================= */
const BASE_PORT = 3000;
const MAX_PORT = 9000;
const CONTAINER_PREFIX = "dev";

// 🔥 REAL ROOT (IMPORTANT)
const PROJECT_ROOT =
  process.env.PROJECT_ROOT ||
  path.join(process.cwd(), "projects");

/* =========================
   🧠 FIND FREE PORT (CROSS-PLATFORM)
========================= */
async function getFreePort(): Promise<number> {
  for (let port = BASE_PORT; port < MAX_PORT; port++) {
    try {
      const { stdout } = await run(
        process.platform === "win32"
          ? `netstat -ano | findstr :${port}`
          : `lsof -i :${port} || true`
      );

      if (!stdout) return port;
    } catch {
      return port;
    }
  }
  throw new Error("No free ports available");
}

/* =========================
   🧠 CHECK CONTAINER
========================= */
async function containerExists(name: string) {
  const { stdout } = await run(
    `docker ps -a --filter "name=${name}" --format "{{.Names}}"`
  );
  return stdout.includes(name);
}

/* =========================
   🧠 GET STATUS
========================= */
async function getStatus(name: string) {
  try {
    const { stdout } = await run(
      `docker inspect -f "{{.State.Status}}" ${name}`
    );
    return stdout.trim();
  } catch {
    return "not_found";
  }
}

/* =========================
   🧠 GET PORT
========================= */
async function getContainerPort(name: string): Promise<number> {
  try {
    const { stdout } = await run(
      `docker port ${name} 3000`
    );

    const match = stdout.match(/:(\d+)/);
    return match ? parseInt(match[1]) : 0;
  } catch {
    return 0;
  }
}

/* =========================
   🚀 START CONTAINER
========================= */
async function startContainer(projectId: string) {
  const name = `${CONTAINER_PREFIX}-${projectId}`;
  const projectPath = path.join(PROJECT_ROOT, projectId);

  // ensure project exists
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  const exists = await containerExists(name);

  if (exists) {
    const status = await getStatus(name);

    if (status !== "running") {
      await run(`docker start ${name}`);
    }

    const port = await getContainerPort(name);

    return {
      reused: true,
      url: `http://localhost:${port}`,
      container: name,
    };
  }

  const port = await getFreePort();

  await run(`
docker run -d \
--name ${name} \
-p ${port}:3000 \
-v "${projectPath}:/app" \
-w /app \
--memory="1g" \
--cpus="1.0" \
node:18 \
sh -c "npm install && npm run dev"
  `);

  return {
    reused: false,
    url: `http://localhost:${port}`,
    container: name,
  };
}

/* =========================
   🔁 AUTO-HEAL
========================= */
async function ensureRunning(name: string) {
  const status = await getStatus(name);

  if (status === "exited" || status === "dead") {
    await run(`docker restart ${name}`);
    return "restarted";
  }

  return status;
}

/* =========================
   📡 STREAM LOGS
========================= */
function streamLogs(name: string) {
  const proc = exec(`docker logs -f ${name}`);
  return proc.stdout;
}

/* =========================
   🚀 API
========================= */
export async function POST(req: Request) {
  const { action, projectId } = await req.json();

  if (!projectId) {
    return Response.json(
      { error: "Missing projectId" },
      { status: 400 }
    );
  }

  const name = `${CONTAINER_PREFIX}-${projectId}`;

  try {
    /* =========================
       ▶ START
    ========================= */
    if (action === "start") {
      const result = await startContainer(projectId);
      return Response.json({ success: true, ...result });
    }

    /* =========================
       ⏹ STOP
    ========================= */
    if (action === "stop") {
      await run(`docker stop ${name} || true`);
      await run(`docker rm ${name} || true`);
      return Response.json({ success: true });
    }

    /* =========================
       📊 STATUS
    ========================= */
    if (action === "status") {
      const status = await getStatus(name);
      const port = await getContainerPort(name);

      return Response.json({
        status,
        url: port ? `http://localhost:${port}` : null,
      });
    }

    /* =========================
       🔁 AUTO-HEAL
    ========================= */
    if (action === "heal") {
      const status = await ensureRunning(name);
      return Response.json({ status });
    }

    /* =========================
       📜 LOGS (STREAM)
    ========================= */
    if (action === "logs") {
      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          const send = (text: string) =>
            controller.enqueue(encoder.encode(text));

          const logs = streamLogs(name);

          logs?.on("data", (chunk) => {
            send(chunk.toString());
          });

          logs?.on("end", () => {
            controller.close();
          });

          logs?.on("error", () => {
            controller.close();
          });
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    /* =========================
       🔄 RESTART
    ========================= */
    if (action === "restart") {
      await run(`docker restart ${name}`);
      return Response.json({ success: true });
    }

    return Response.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (e: any) {
    return Response.json({
      error: e.message,
    });
  }
}