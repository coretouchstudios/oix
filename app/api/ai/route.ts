import OpenAI from "openai";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const ROOT = path.join(process.cwd(), "sandbox");

export async function POST(req: Request) {
  const { message, file } = await req.json();

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
      // 📂 LOAD FILE (OPTIONAL)
      // -------------------------
      let fileContent = "";

      if (file) {
        const filePath = path.join(ROOT, file);

        if (fs.existsSync(filePath)) {
          fileContent = fs.readFileSync(filePath, "utf-8");
        }
      }

      // -------------------------
      // 🧠 PLANNER AGENT
      // -------------------------
      send("[PLANNER]\n");

      const planner = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a senior AI planner.

Memory:
${memoryText}

Break the task into clear executable steps.
Return each step on a new line.
            `,
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

      const plan = planner.choices[0].message.content || "";
      send(plan + "\n");

      // -------------------------
      // ⚡ EXECUTION AGENTS
      // -------------------------
      send("\n[AGENTS]\n");

      const steps = plan
        .split("\n")
        .filter((s) => s.trim().length > 0);

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

If a FILE is provided, you can modify it.

If modifying code, return ONLY the updated code.
Otherwise, respond normally.
              `,
            },
            {
              role: "user",
              content: `
TASK:
${step}

FILE (if exists):
${fileContent}
              `,
            },
          ],
        });

        let text = "";

        for await (const chunk of response) {
          const t = chunk.choices[0]?.delta?.content || "";
          text += t;
          output += t;
        }

        return { output, text };
      };

      const results = await Promise.all(
        steps.map((step, i) => runAgent(step, i))
      );

      for (const r of results) {
        send(r.output + "\n");
      }

      // -------------------------
      // 🧬 FINAL SYNTHESIS
      // -------------------------
      send("\n[FINAL]\n");

      const final = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
Combine all agent outputs into one clean final answer.
If code is involved, return the final working version.
            `,
          },
          {
            role: "user",
            content: results.map((r) => r.text).join("\n"),
          },
        ],
      });

      const finalText = final.choices[0].message.content || "";
      send(finalText);

      // -------------------------
      // 💾 SAVE FILE (AUTOCODER)
      // -------------------------
      if (file && finalText.trim().length > 0) {
        const filePath = path.join(ROOT, file);

        try {
          fs.writeFileSync(filePath, finalText);
          send("\n[SAVED TO FILE]\n");
        } catch (e) {
          send("\n[ERROR SAVING FILE]\n");
        }
      }

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