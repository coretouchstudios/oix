import { NextRequest } from "next/server";
import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

export const runtime = "nodejs";

/* =========================
   ⚙️ CONFIG
========================= */
const IMAGE = "node:18-alpine";
const PREFIX = "ai-sandbox";

/* =========================
   🧠 GET / CREATE CONTAINER
========================= */
async function getContainer(sessionId: string) {
  const name = `${PREFIX}-${sessionId}`;

  const { stdout } = await execAsync(
    `docker ps -a --filter "name=${name}" --format "{{.Names}}"`
  );

  if (!stdout.includes(name)) {
    await execAsync(`
      docker run -dit \
      --name ${name} \
      --network none \
      --memory="512m" \
      --cpus="0.5" \
      -w /app \
      ${IMAGE} sh
    `);

    // install base tools once
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
   📁 APPLY MULTI FILE FIX
========================= */
async function applyFix(container: string, fix: string) {
  const matches = [
    ...fix.matchAll(
      /\[FILE\][\s\S]*?name:\s*(.*?)\ncontent:\s*```[\w]*\n([\s\S]*?)```/g
    ),
  ];

  if (!matches.length) return false;

  for (const m of matches) {
    const filename = m[1].trim();
    const content = m[2];

    try {
      await execAsync(
        `docker exec ${container} sh -c "mkdir -p $(dirname ${filename})"`
      );

      await execAsync(
        `docker exec ${container} sh -c "cat > ${filename} << 'EOF'\n${content}\nEOF"`
      );
    } catch {
      return false;
    }
  }

  return true;
}

/* =========================
   🧠 MULTI-AGENT AI FIX
========================= */
async function getFix(error: string, code: string) {
  const OpenAI = (await import("openai")).default;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  async function runAgent(role: string, style: string) {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are ${role}.
Style: ${style}

Fix the error.

Return ONLY FILE blocks:

[FILE]
name: path/file.ts
content:
\`\`\`ts
code
\`\`\`
          `,
        },
        {
          role: "user",
          content: `
ERROR:
${error}

CODE:
${code}
          `,
        },
      ],
    });

    return res.choices[0].message.content || "";
  }

  const [A, B, C] = await Promise.all([
    runAgent("DEV_A", "fast fix"),
    runAgent("DEV_B", "safe fix"),
    runAgent("DEV_C", "best long-term"),
  ]);

  // simple voting (can upgrade later)
  return A.length >= B.length && A.length >= C.length ? A : B.length >= C.length ? B : C;
}

/* =========================
   🚀 MAIN LOOP
========================= */
export async function POST(req: NextRequest) {
  const { command, sessionId, codeContext } = await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (t: string) =>
        controller.enqueue(encoder.encode(t));

      try {
        if (!sessionId) {
          send("❌ Missing sessionId\n");
          controller.close();
          return;
        }

        const container = await getContainer(sessionId);

        send(`🟢 Container: ${container}\n`);

        let attempts = 0;
        const MAX = 5;

        let output = "";

        while (attempts < MAX) {
          attempts++;

          send(`\n⚡ RUN ${attempts}\n`);
          send(`$ ${command}\n\n`);

          output = await run(container, command);
          send(output);

          const lower = output.toLowerCase();

          /* =========================
             ✅ SUCCESS DETECTION
          ========================= */
          if (
            !lower.includes("error") &&
            !lower.includes("failed") &&
            !lower.includes("exception")
          ) {
            send("\n✅ SUCCESS\n");
            break;
          }

          /* =========================
             🧠 AI FIX LOOP
          ========================= */
          send("\n🧠 AI FIXING...\n");

          const fix = await getFix(output, codeContext || "");

          send("\n[AI FIX]\n" + fix);

          const applied = await applyFix(container, fix);

          if (!applied) {
            send("\n❌ Failed to apply fix\n");
            break;
          }

          send("\n♻️ FIX APPLIED → RETRYING...\n");
        }

        if (attempts === MAX) {
          send("\n⚠️ Max attempts reached\n");
        }

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