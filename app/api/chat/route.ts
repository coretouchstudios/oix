import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* ================= BASE URL FIX ================= */
const base =
  process.env.BASE_URL ||
  `http://localhost:${process.env.PORT || 3000}`;

/* ================= TIMEOUT ================= */
function withTimeout(promise: Promise<any>, ms = 20000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms)
    ),
  ]);
}

/* ================= SAFE JSON ================= */
function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

/* ================= ERROR CLASSIFIER ================= */
function classifyError(log: string) {
  if (/module not found/i.test(log)) return "missing-dep";
  if (/typescript/i.test(log)) return "type-error";
  if (/permission/i.test(log)) return "env";
  return "unknown";
}

/* ================= AGENT ================= */
async function runAgent({
  role,
  message,
  memory,
  code,
  terminal,
}: {
  role: string;
  message: string;
  memory: string;
  code: string;
  terminal: string;
}) {
  const res = await withTimeout(
    openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `
You are ${role} in an autonomous AI dev system.

Return STRICT JSON ONLY:
{
  "files": [{ "path": "", "content": "" }],
  "commands": [],
  "analysis": "",
  "confidence": 0-1
}

ERROR TYPE:
${classifyError(terminal)}

Memory:
${memory}
          `,
        },
        {
          role: "user",
          content: `
TASK:
${message}

CODE:
${code || "none"}

TERMINAL:
${terminal || "none"}
          `,
        },
      ],
    })
  );

  return safeParse(res.choices[0].message.content || "{}");
}

/* ================= JUDGE ================= */
async function judge(A: any, B: any, C: any) {
  const res = await withTimeout(
    openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `Return JSON: { "winner": "A|B|C", "confidence": number }`,
        },
        {
          role: "user",
          content: `
A:${JSON.stringify(A)}
B:${JSON.stringify(B)}
C:${JSON.stringify(C)}
          `,
        },
      ],
    })
  );

  return safeParse(res.choices[0].message.content || "{}");
}

/* ================= MERGE ================= */
async function merge(A: any, B: any, C: any) {
  const res = await withTimeout(
    openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: "Merge into best JSON solution. Return valid JSON only.",
        },
        {
          role: "user",
          content: `
A:${JSON.stringify(A)}
B:${JSON.stringify(B)}
C:${JSON.stringify(C)}
          `,
        },
      ],
    })
  );

  return safeParse(res.choices[0].message.content || "{}");
}

/* ================= ROUTE ================= */
export async function POST(req: Request) {
  const { message, sessionId, codeContext, terminalOutput } =
    await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (t: string) =>
        controller.enqueue(encoder.encode(t));

      /* ================= SESSION ================= */
      let currentSessionId = sessionId;

      if (!currentSessionId) {
        const s = await prisma.session.create({
          data: {},
        });
        currentSessionId = s.id;
      }

      /* ================= MEMORY ================= */
      let memoryContext = "";

      try {
        const mem = await fetch(`${base}/api/memory/search`, {
          method: "POST",
          body: JSON.stringify({
            query: message,
            sessionId: currentSessionId,
          }),
        }).then((r) => r.json());

        memoryContext = mem?.synthesized || "";
      } catch {}

      /* ================= LOOP ================= */
      let loop = 0;
      const MAX = 6;

      let latestTerminal = terminalOutput || "";
      let finalResult: any = {};

      while (loop < MAX) {
        loop++;
        send(`\n⚡ LOOP ${loop}\n`);

        const [A, B, C] = await Promise.all([
          runAgent({
            role: "FAST_DEV",
            message,
            memory: memoryContext,
            code: codeContext,
            terminal: latestTerminal,
          }),
          runAgent({
            role: "SAFE_DEV",
            message,
            memory: memoryContext,
            code: codeContext,
            terminal: latestTerminal,
          }),
          runAgent({
            role: "ARCHITECT",
            message,
            memory: memoryContext,
            code: codeContext,
            terminal: latestTerminal,
          }),
        ]);

        send("🧠 agents done\n");

        let vote = await judge(A, B, C);
        if (!vote.winner) vote = { winner: "A", confidence: 0.5 };

        send(`🏆 ${vote.winner} (${(vote.confidence * 100).toFixed(0)}%)\n`);

        let result = A;
        if (vote.winner === "B") result = B;
        if (vote.winner === "C") result = C;

        if (vote.confidence < 0.65) {
          send("🧬 merging...\n");
          result = await merge(A, B, C);
        }

        finalResult = result;

        /* ================= WRITE FILES (FIXED) ================= */
        if (result.files?.length) {
          const basePath = path.join(
            process.cwd(),
            "projects",
            currentSessionId
          );

          send("📁 writing files...\n");

          for (const f of result.files) {
            if (!f.path) continue;

            try {
              const fullPath = path.join(basePath, f.path);

              await fs.mkdir(path.dirname(fullPath), {
                recursive: true,
              });

              await fs.writeFile(fullPath, f.content || "");
              send(`✅ ${f.path}\n`);
            } catch (e: any) {
              send(`❌ ${e.message}\n`);
            }
          }
        }

        /* ================= TERMINAL ================= */
        if (result.commands?.length) {
          if (latestTerminal.length > 20000) {
            send("\n⚠️ terminal overflow — stopping\n");
            break;
          }

          send("⚡ running...\n");

          try {
            const res = await fetch(`${base}/api/terminal`, {
              method: "POST",
              body: JSON.stringify({
                command: result.commands.join(" && "),
                sessionId: currentSessionId,
                codeContext,
              }),
            });

            if (!res.body) break;

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            let output = "";

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              output += chunk;
              send(chunk);
            }

            latestTerminal = output;

            if (/compiled|ready|success|localhost/i.test(output)) {
              send("\n✅ BUILD SUCCESS\n");
              break;
            }

            send("\n🔁 retrying...\n");
          } catch {
            break;
          }
        } else {
          break;
        }
      }

      /* ================= SAVE MEMORY (FIXED) ================= */
      try {
        const { getEmbedding } = await import("@/lib/embed");

        const summary = JSON.stringify(finalResult).slice(0, 2000);
        const embedding = await getEmbedding(summary);

        await prisma.memory.create({
          data: {
            input: message,
            output: summary,
            embedding_vector: embedding, // ✅ FIXED
            importance: Math.min(
              1,
              0.5 + (finalResult?.confidence || 0.5)
            ),
            type: "long",
            sessionId: currentSessionId,
          },
        });
      } catch {}

      send("\n🎯 DONE\n");
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain" },
  });
}