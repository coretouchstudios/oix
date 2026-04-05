import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { message, sessionId, userId } = await req.json();

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  /* =========================
     🧠 SESSION
  ========================= */
  let currentSessionId = sessionId;

  if (!currentSessionId) {
    const session = await prisma.session.create({
      data: {
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        refreshToken: randomBytes(32).toString("hex"),
        ip: req.headers.get("x-forwarded-for") || "",
        userAgent: req.headers.get("user-agent") || "",
      },
    });

    currentSessionId = session.id;
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (text: string) =>
        controller.enqueue(encoder.encode(text));

      try {
        send("\n[AI]\n");

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

        /* =========================
           🧠 MEMORY SAVE
        ========================= */
        await prisma.memory.create({
          data: {
            input: message,
            output: final,
            embedding: "",
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
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}