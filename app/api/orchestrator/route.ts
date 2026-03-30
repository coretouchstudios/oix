import OpenAI from "openai";
import { exec } from "child_process";
import util from "util";
import fs from "fs/promises";
import path from "path";

const run = util.promisify(exec);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = "nodejs";

/* =========================
   🔧 CONFIG
========================= */
const MAX_CYCLES = 5;

const PROJECT_ROOT =
  process.env.PROJECT_ROOT ||
  path.join(process.cwd(), "projects");

/* =========================
   🧠 SAFE WRITE FILE
========================= */
async function writeFileSafe(
  basePath: string,
  filePath: string,
  content: string
) {
  const fullPath = path.join(basePath, filePath);

  await fs.mkdir(path.dirname(fullPath), {
    recursive: true,
  });

  await fs.writeFile(fullPath, content, "utf-8");

  return fullPath;
}

/* =========================
   🐳 RUN PROJECT (ISOLATED BUILD)
========================= */
async function runProject(projectId: string) {
  const projectPath = path.join(PROJECT_ROOT, projectId);

  try {
    const { stdout, stderr } = await run(`
docker run --rm \
-v "${projectPath}:/app" \
-w /app \
node:18 \
sh -c "npm install && npm run build"
    `);

    return stdout + stderr;
  } catch (err: any) {
    return (err.stdout || "") + (err.stderr || "");
  }
}

/* =========================
   🧠 AI FIX ENGINE
========================= */
async function getFix({
  message,
  error,
  code,
}: {
  message: string;
  error: string;
  code: string;
}) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are an autonomous senior engineer.

Fix the issue.

Return STRICT JSON:
{
  "files": [
    { "path": "file.ts", "content": "full updated code" }
  ],
  "summary": "short explanation"
}

Rules:
- Fix root cause
- Return FULL files
- No markdown
- Production-safe code
        `,
      },
      {
        role: "user",
        content: `
TASK:
${message}

ERROR:
${error}

CODEBASE:
${code}
        `,
      },
    ],
  });

  try {
    return JSON.parse(res.choices[0].message.content || "{}");
  } catch {
    return null;
  }
}

/* =========================
   🧠 MEMORY INJECTION
========================= */
async function getMemoryContext(
  message: string,
  projectId: string
) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/memory/system`,
      {
        method: "POST",
        body: JSON.stringify({
          mode: "retrieve",
          query: message,
          sessionId: projectId,
        }),
      }
    );

    const data = await res.json();
    return data?.synthesized || "";
  } catch {
    return "";
  }
}

/* =========================
   🚀 ORCHESTRATOR
========================= */
export async function POST(req: Request) {
  const { message, projectId, codeContext } =
    await req.json();

  if (!projectId) {
    return Response.json(
      { error: "Missing projectId" },
      { status: 400 }
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (t: string) =>
        controller.enqueue(encoder.encode(t));

      const basePath = path.join(PROJECT_ROOT, projectId);

      await fs.mkdir(basePath, { recursive: true });

      let currentCode = codeContext || "";
      let lastError = "";

      /* =========================
         🧠 MEMORY LOAD
      ========================= */
      const memory = await getMemoryContext(
        message,
        projectId
      );

      for (let cycle = 1; cycle <= MAX_CYCLES; cycle++) {
        send(`\n🚀 CYCLE ${cycle}\n`);

        /* =========================
           🐳 BUILD
        ========================= */
        send("\n🐳 Running build...\n");

        const logs = await runProject(projectId);

        send("\n📡 LOGS:\n" + logs + "\n");

        const isError =
          logs.toLowerCase().includes("error") ||
          logs.toLowerCase().includes("failed");

        if (!isError) {
          send("\n✅ BUILD SUCCESS — DONE\n");
          break;
        }

        lastError = logs;

        /* =========================
           🧠 AI FIX
        ========================= */
        send("\n🧠 AI ANALYZING...\n");

        const fix = await getFix({
          message: `
Memory:
${memory}

Task:
${message}
          `,
          error: logs,
          code: currentCode,
        });

        if (!fix || !fix.files?.length) {
          send("\n❌ AI FAILED TO FIX\n");
          break;
        }

        send("\n🛠 APPLYING FIXES...\n");

        /* =========================
           📁 APPLY FILES
        ========================= */
        for (const file of fix.files) {
          try {
            await writeFileSafe(
              basePath,
              file.path,
              file.content
            );

            send(`✔ ${file.path}\n`);
          } catch (err: any) {
            send(`❌ File error: ${err.message}\n`);
          }
        }

        /* =========================
           🔄 UPDATE CONTEXT
        ========================= */
        currentCode = fix.files
          .map(
            (f: any) =>
              `FILE:${f.path}\n${f.content}`
          )
          .join("\n\n");

        send("\n🔁 RETRYING...\n");
      }

      send("\n🏁 FINISHED\n");
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}