import OpenAI from "openai";
import { prisma } from "@/lib/prisma";


export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();

  const {
    query,
    input,
    output,
    sessionId,
    mode = "retrieve", // retrieve | store | reflect
  } = body;

  try {
    /* =========================
       🧠 STORE MEMORY
    ========================= */
    if (mode === "store" && input && output) {
      const embedding = await createEmbedding(input + "\n" + output);

      const importance = Math.min(
        1,
        0.5 + output.length / 2000 + Math.random() * 0.2
      );

      const memory = await prisma.memory.create({
        data: {
          input,
          output,
          embedding,
          importance,
          type: importance > 0.75 ? "long" : "short",
          sessionId,
        },
      });

      return Response.json({
        success: true,
        memory,
      });
    }

    /* =========================
       🔍 RETRIEVE MEMORY
    ========================= */
    if (mode === "retrieve" && query) {
      const embedding = await createEmbedding(query);
      const vector = `[${embedding.join(",")}]`;

      await prisma.$executeRawUnsafe(`SET ivfflat.probes = 10;`);

      const memories = await prisma.$queryRawUnsafe<any[]>(`
        SELECT
          id,
          input,
          output,
          importance,
          type,
          "createdAt",

          embedding_vector <-> '${vector}' AS distance,

          (
            CASE
              WHEN input ILIKE '%' || ${query} || '%' THEN 0.4
              WHEN output ILIKE '%' || ${query} || '%' THEN 0.25
              ELSE 0
            END
          ) AS keyword_boost,

          (
            (embedding_vector <-> '${vector}')
            - (
              CASE
                WHEN input ILIKE '%' || ${query} || '%' THEN 0.4
                WHEN output ILIKE '%' || ${query} || '%' THEN 0.25
                ELSE 0
              END
            )
            - (importance * 0.35)
            - (EXTRACT(EPOCH FROM NOW() - "createdAt") / 120000)
          ) AS score

        FROM "Memory"
        WHERE embedding_vector IS NOT NULL
        ${
          sessionId
            ? `AND ("sessionId" = '${sessionId}' OR type = 'long')`
            : ""
        }

        ORDER BY score ASC
        LIMIT 15;
      `);

      /* =========================
         🧠 SYNTHESIS
      ========================= */
      let synthesized = "";

      const top = memories.slice(0, 5);

      if (top.length) {
        const res = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
You are an AI memory synthesizer.

- Merge relevant memories
- Remove duplication
- Keep only useful info
- Output clean actionable context
              `,
            },
            {
              role: "user",
              content: `
Query:
${query}

Memories:
${top
  .map(
    (m, i) => `
#${i + 1}
User: ${m.input}
Agent: ${m.output}
`
  )
  .join("\n")}
              `,
            },
          ],
        });

        synthesized = res.choices[0].message.content || "";
      }

      return Response.json({
        results: memories,
        synthesized,
      });
    }

    /* =========================
       🧬 REFLECTION (SELF-LEARNING)
    ========================= */
    if (mode === "reflect" && input && output) {
      const reflection = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a self-improving AI.

Analyze the interaction and extract:
- What worked
- What failed
- What should be remembered

Return JSON:
{
  "learning": "",
  "importance": 0-1
}
            `,
          },
          {
            role: "user",
            content: `
INPUT:
${input}

OUTPUT:
${output}
            `,
          },
        ],
      });

      let parsed = {
        learning: "",
        importance: 0.7,
      };

      try {
        parsed = JSON.parse(
          reflection.choices[0].message.content || "{}"
        );
      } catch {}

      const embedding = await createEmbedding(parsed.learning);

      await prisma.memory.create({
        data: {
          input,
          output: parsed.learning,
          embedding,
          importance: parsed.importance || 0.7,
          type: "long",
          sessionId,
        },
      });

      return Response.json({
        reflection: parsed,
      });
    }

    return Response.json({
      error: "Invalid mode or missing fields",
    });
  } catch (e: any) {
    return Response.json({
      error: e.message,
    });
  }
}