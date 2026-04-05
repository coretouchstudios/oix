import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* ================= ROUTE ================= */
export async function POST(req: Request) {
  const { message, sessionId, userId, codeContext, terminalOutput } =
    await req.json();

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (t: string) =>
        controller.enqueue(encoder.encode(t));

      try {
        /* ================= SESSION ================= */
        let currentSessionId = sessionId;

        if (!currentSessionId) {
          const session = await prisma.session.create({
            data: {
              userId,
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              refreshToken: randomBytes(32).toString("hex"),
              ip: req.headers.get("x-forwarded-for") || "",
              userAgent: req.headers.get("user-agent") || "",
            },
          });

          currentSessionId = session.id;
        }

        send("⚡ AI START\n");

        /* ================= SIMPLE AI (STABLE FIRST) ================= */
        const res = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        });

        let final = "";

        for await (const chunk of res) {
          const text = chunk.choices[0]?.delta?.content || "";
          final += text;
          send(text);
        }

        /* ================= SAVE MEMORY ================= */
        await prisma.memory.create({
          data: {
            input: message,
            output: final,
            embedding: "", // keep simple for now
            importance: 0.5,
            type: "short",
            sessionId: currentSessionId,
            userId,
          },
        });

        send("\n✅ DONE\n");
        controller.close();
      } catch (err: any) {
        controller.enqueue(
          encoder.encode(`❌ ${err.message}`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain" },
  });
}