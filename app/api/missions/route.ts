import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* ---------------- TOOLS ---------------- */

// 🌐 Web Search
async function webSearch(query: string) {
  try {
    const res = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(
        query
      )}&format=json`
    );
    const data = await res.json();
    return data.AbstractText || "No results found.";
  } catch {
    return "Web search failed.";
  }
}

// 💻 Code Execution (⚠️ basic)
async function runCode(code: string) {
  try {
    const result = eval(code);
    return String(result);
  } catch (err: any) {
    return "Code error: " + err.message;
  }
}

/* ---------------- GET ---------------- */
export async function GET(req: Request) {
  const userId = req.headers.get("x-user");

  if (!userId) return NextResponse.json([]);

  const missions = await prisma.mission.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(missions);
}

/* ---------------- POST ---------------- */
export async function POST(req: Request) {
  const userId = req.headers.get("x-user");
  const { input } = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const mission = await prisma.mission.create({
    data: {
      input,
      userId,
      status: "running",
      output: "",
    },
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        /* ---------------- MEMORY ---------------- */
        const memories = await prisma.memory.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 5,
        });

        const memoryContext = memories
          .map((m) => `- ${m.content}`)
          .join("\n");

        /* ---------------- PLAN ---------------- */
        const planRes = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a strategist AI. Plan the task.",
            },
            {
              role: "user",
              content: `${memoryContext}\nTASK:${input}`,
            },
          ],
        });

        const plan = planRes.choices[0]?.message?.content || "";

        let fullOutput = `🧠 STRATEGY:\n${plan}\n\n🤖 EXECUTION:\n`;

        controller.enqueue(encoder.encode(fullOutput));

        /* ---------------- STREAM EXECUTION ---------------- */
        const execStream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          messages: [
            {
              role: "system",
              content: "Execute step-by-step.",
            },
            {
              role: "user",
              content: `${memoryContext}\nPLAN:${plan}`,
            },
          ],
        });

        for await (const chunk of execStream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (!text) continue;

          fullOutput += text;

          controller.enqueue(encoder.encode(text));

          await prisma.mission.update({
            where: { id: mission.id },
            data: { output: fullOutput },
          });
        }

        /* ---------------- SAVE MEMORY ---------------- */
        await prisma.memory.create({
          data: {
            userId,
            content: `${input} → ${fullOutput.slice(0, 500)}`,
          },
        });

        await prisma.mission.update({
          where: { id: mission.id },
          data: { status: "completed" },
        });

        controller.close();
      } catch (err) {
        console.error(err);
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}