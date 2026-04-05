import { NextRequest } from "next/server";
import { exec } from "child_process";
import util from "util";
import path from "path";

const execAsync = util.promisify(exec);

export const runtime = "nodejs";

/* =========================
   ⚙️ CONFIG
========================= */
const IMAGE = "node:18-alpine";
const PREFIX = "oix-project";

/* =========================
   📁 PROJECT PATH
========================= */
function getProjectPath(projectId: string) {
  return path.join(process.cwd(), "sandbox", "projects", projectId);
}

/* =========================
   🧠 GET / CREATE CONTAINER
========================= */
async function getContainer(projectId: string) {
  const name = `${PREFIX}-${projectId}`;
  const projectPath = getProjectPath(projectId);

  const { stdout } = await execAsync(
    `docker ps -a --filter "name=${name}" --format "{{.Names}}"`
  );

  if (!stdout.includes(name)) {
    // 🔥 CREATE CONTAINER WITH VOLUME MOUNT
    await execAsync(`
      docker run -dit \
      --name ${name} \
      --network none \
      --memory="512m" \
      --cpus="0.5" \
      -v "${projectPath}:/app" \
      -w /app \
      ${IMAGE} sh
    `);

    // install tools once
    await execAsync(
      `docker exec ${name} sh -c "apk add --no-cache git bash npm"`
    );
  } else {
    await execAsync(`docker start ${name}`);
  }

  return name;
}

/* =========================
   ⚡ EXEC COMMAND
========================= */
async function run(container: string, cmd: string) {
  const safe = cmd.replace(/"/g, '\\"');

  const { stdout, stderr } = await execAsync(
    `docker exec ${container} sh -c "${safe}"`
  );

  return stdout + stderr;
}

/* =========================
   📦 MAIN
========================= */
export async function POST(req: NextRequest) {
  const { projectId, command } = await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (t: string) =>
        controller.enqueue(encoder.encode(t));

      try {
        if (!projectId || !command) {
          send("❌ Missing projectId or command\n");
          controller.close();
          return;
        }

        const container = await getContainer(projectId);

        send(`🟢 Project Container: ${container}\n`);
        send(`$ ${command}\n\n`);

        const output = await run(container, command);

        send(output);

        send("\n✅ Done\n");

        controller.close();
      } catch (e: any) {
        send(`❌ ${e.message}\n`);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}