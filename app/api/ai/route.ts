import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (text: string) => {
        controller.enqueue(encoder.encode(text));
      };

      // -------------------------
      // 🧠 LOAD MEMORY
      // -------------------------
      const pastMemories = await prisma.memory.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      });

      const memoryText = pastMemories
        .map((m) => `User: ${m.input}\nAgent: ${m.output}`)
        .join("\n\n");

      // -------------------------
      // 🧠 PLANNER
      // -------------------------
      send("[PLANNER]\n");

      const planner = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a planning agent.

Past memory:
${memoryText}

Break the task into independent parallel steps.
Return each step clearly.
            `,
          },
          { role: "user", content: message },
        ],
      });

      const plan = planner.choices[0].message.content || "";
      send(plan + "\n");

      // -------------------------
      // ⚡ PARALLEL AGENTS
      // -------------------------
      send("\n[PARALLEL AGENTS]\n");

      const steps = plan
        .split("\n")
        .filter((s) => s.trim().length > 0);

      const { runTool } = await import("@/lib/tools");

      const runAgent = async (step: string, index: number) => {
        let output = `\n[Agent ${index + 1}] ${step}\n`;

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          messages: [
            {
              role: "system",
              content: `
You are an execution agent.

You can use tools.

Available tools:
- search(query)
- calculator(expression)

If needed, respond EXACTLY like:

[TOOL] search: latest AI news

OR

[TOOL] calculator: 25 * 4

Otherwise, continue normally.
              `,
            },
            {
              role: "user",
              content: step,
            },
          ],
        });

        let execution = "";

        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
          execution += text;

          // TOOL DETECTION
          if (execution.includes("[TOOL]")) {
            const match = execution.match(/\[TOOL\]\s*(\w+):\s*(.*)/);

            if (match) {
              const [, toolName, input] = match;

              output += `⚡ Tool: ${toolName}\n`;

              const result = await runTool(toolName, input);
              output += result + "\n";

              execution = "";
              continue;
            }
          }

          output += text;
        }

        return output;
      };

      // RUN ALL AGENTS IN PARALLEL
      const results = await Promise.all(
        steps.map((step, i) => runAgent(step, i))
      );

      // STREAM RESULTS
      for (const res of results) {
        send(res + "\n");
      }

      // -------------------------
      // 🔍 FINAL SYNTHESIS
      // -------------------------
      send("\n[FINAL]\n");

      const final = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
Combine all agent outputs into a single clean answer.
            `,
          },
          {
            role: "user",
            content: results.join("\n"),
          },
        ],
      });

      const finalText = final.choices[0].message.content || "";
      send(finalText);

      // -------------------------
      // 💾 SAVE MEMORY
      // -------------------------
      await prisma.memory.create({
        data: {
          input: message,
          output: finalText,
        },
      });

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}