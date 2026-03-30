import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* =========================
   🔁 CONFIG
========================= */
const MAX_ITERATIONS = 5;

/* =========================
   🚀 API
========================= */
export async function POST(req: Request) {
  const { message, sessionId } = await req.json();

  /* =========================
     🧠 SESSION
  ========================= */
  let currentSessionId = sessionId;

  if (!currentSessionId) {
    const session = await prisma.session.create({
      data: { title: message.slice(0, 50) },
    });
    currentSessionId = session.id;
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (text: string) =>
        controller.enqueue(encoder.encode(text));

      try {
        /* =========================
           🧠 MEMORY LOAD
        ========================= */
        const { getRelevantMemories } = await import("@/lib/memory");

        const memories = await getRelevantMemories(
          message,
          currentSessionId
        );

        const memoryText = memories
          .slice(0, 5)
          .map((m) => `User: ${m.input}\nAgent: ${m.output}`)
          .join("\n\n");

        /* =========================
           🧠 PLANNER
        ========================= */
        send("\n[PLANNER]\n");

        const planner = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
Break the task into clear steps.

Keep it concise.
              `,
            },
            {
              role: "user",
              content: `${message}\n\nMemory:\n${memoryText}`,
            },
          ],
        });

        const plan = planner.choices[0].message.content || "";
        send(plan + "\n");

        /* =========================
           🔁 MULTI-AGENT LOOP
        ========================= */
        let sharedContext = `PLAN:\n${plan}\n`;
        let iteration = 0;

        async function runAgent(role: string, instruction: string) {
          send(`\n[${role}]\n`);

          const res = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            stream: true,
            messages: [
              {
                role: "system",
                content: `
You are ${role}.

Instruction:
${instruction}

Context:
${sharedContext}

Memory:
${memoryText}

Rules:
- Be concise
- Improve solution
- If complete → [DONE]
- If using tool → format:
  [TOOL] name: input
                `,
              },
              {
                role: "user",
                content: message,
              },
            ],
          });

          let buffer = "";

          for await (const chunk of res) {
            const text = chunk.choices[0]?.delta?.content || "";
            buffer += text;

            /* =========================
               TOOL DETECTION
            ========================= */
            if (buffer.includes("[TOOL]")) {
              const match = buffer.match(/\[TOOL\]\s*(\w+):\s*(.*)/);

              if (match) {
                const [, toolName, input] = match;

                send(`\n⚡ Using ${toolName}\n`);

                try {
                  const { runTool } = await import("@/lib/tools");
                  const result = await runTool(toolName, input);

                  send(result + "\n");
                } catch (e: any) {
                  send(`❌ Tool error: ${e.message}\n`);
                }

                buffer = "";
                continue;
              }
            }

            send(text);
          }

          return buffer;
        }

        while (iteration < MAX_ITERATIONS) {
          iteration++;
          send(`\n🔁 Iteration ${iteration}\n`);

          const researcher = await runAgent(
            "RESEARCHER",
            "Find missing info and validate assumptions."
          );
          if (researcher.includes("[DONE]")) break;

          sharedContext += `\n[RESEARCH]\n${researcher}`;

          const strategist = await runAgent(
            "STRATEGIST",
            "Optimize and refine approach."
          );
          if (strategist.includes("[DONE]")) break;

          sharedContext += `\n[STRATEGY]\n${strategist}`;

          const builder = await runAgent(
            "BUILDER",
            "Produce final working solution."
          );
          if (builder.includes("[DONE]")) break;

          sharedContext += `\n[BUILD]\n${builder}`;

          /* =========================
             SELF REVIEW
          ========================= */
          send("\n[SELF-REVIEW]\n");

          const review = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "Say [DONE] if complete, else suggest improvements",
              },
              {
                role: "user",
                content: sharedContext,
              },
            ],
          });

          const reviewText = review.choices[0].message.content || "";
          send(reviewText + "\n");

          if (reviewText.includes("[DONE]")) break;

          sharedContext += `\n[REVIEW]\n${reviewText}`;
        }

        /* =========================
           🎯 FINAL OUTPUT
        ========================= */
        send("\n[FINAL]\n");

        const finalRes = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Return clean final answer",
            },
            {
              role: "user",
              content: sharedContext,
            },
          ],
        });

        const final = finalRes.choices[0].message.content || "";
        send(final);

        /* =========================
           🧠 MEMORY SAVE
        ========================= */
        const { createEmbedding } = await import("@/lib/embedding");

        const embedding = await createEmbedding(final);

        await prisma.memory.create({
          data: {
            input: message,
            output: final,
            embedding,
            importance: 0.7,
            type: "long",
            sessionId: currentSessionId,
          },
        });

        /* =========================
           🧠 SESSION UPDATE
        ========================= */
        await prisma.session.update({
          where: { id: currentSessionId },
          data: {
            title: message.slice(0, 50),
          },
        });

        send("\n✅ DONE\n");
        controller.close();
      } catch (err: any) {
        controller.enqueue(
          new TextEncoder().encode(`❌ ${err.message}`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}