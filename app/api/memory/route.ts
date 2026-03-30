import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { getEmbedding } from "@/lib/embed";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* ================= SAFE EMBEDDING ================= */
async function createEmbedding(text: string) {
  return getEmbedding(text);
}

/* ================= SAFE SQL ESCAPE ================= */
function escape(str: string) {
  return str.replace(/'/g, "''");
}

/* =========================
   🔍 GET MEMORY
========================= */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sessionId = searchParams.get("sessionId");
  const query = searchParams.get("query");

  /* =========================
     🔍 HYBRID SEARCH
  ========================= */
  if (query) {
    const embedding = await createEmbedding(query);
    const vector = `[${embedding.join(",")}]`;

    const safeQuery = escape(query);

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
            WHEN input ILIKE '%${safeQuery}%' THEN 0.4
            WHEN output ILIKE '%${safeQuery}%' THEN 0.25
            ELSE 0
          END
        ) AS keyword_boost,

        (
          (embedding_vector <-> '${vector}')
          - (
            CASE
              WHEN input ILIKE '%${safeQuery}%' THEN 0.4
              WHEN output ILIKE '%${safeQuery}%' THEN 0.25
              ELSE 0
            END
          )
          - (importance * 0.3)
          - (EXTRACT(EPOCH FROM NOW() - "createdAt") / 100000)
        ) AS score

      FROM "Memory"
      WHERE embedding_vector IS NOT NULL
      ${
        sessionId
          ? `AND ("sessionId" = '${escape(sessionId)}' OR type = 'long')`
          : ""
      }

      ORDER BY score ASC
      LIMIT 20;
    `);

    /* =========================
       🧠 ENRICH
    ========================= */
    const enriched = memories.map((m) => {
      let reason = "Semantic match";

      if (m.keyword_boost > 0) {
        reason = "Keyword + semantic";
      }

      if (m.importance > 0.8) {
        reason += " • High importance";
      }

      return { ...m, reason };
    });

    /* =========================
       🧠 SYNTHESIS
    ========================= */
    let synthesized = "";

    try {
      const top = enriched.slice(0, 5);

      if (top.length > 0) {
        const res = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content: `
You are a memory compression engine.

- Merge insights
- Remove repetition
- Keep only useful info
- Output concise context block
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
[${i + 1}]
User: ${m.input}
AI: ${m.output}
`
  )
  .join("\n")}
              `,
            },
          ],
        });

        synthesized = res.choices[0].message.content || "";
      }
    } catch (err) {
      console.error("Synthesis error:", err);
    }

    return Response.json({
      memories: enriched,
      synthesized,
      rawTop: enriched.slice(0, 5),
    });
  }

  /* =========================
     📚 DEFAULT FETCH
  ========================= */
  const memories = await prisma.$queryRawUnsafe<any[]>(`
    SELECT
      id,
      input,
      output,
      importance,
      type,
      "createdAt"
    FROM "Memory"
    ${
      sessionId
        ? `WHERE "sessionId" = '${escape(sessionId)}'`
        : ""
    }
    ORDER BY importance DESC, "createdAt" DESC
    LIMIT 50;
  `);

  return Response.json({
    memories,
    synthesized: null,
  });
}

/* =========================
   ➕ SAVE MEMORY
========================= */
export async function POST(req: Request) {
  const body = await req.json();

  const {
    input,
    output,
    sessionId,
    importance = 0.5,
    type = "short",
  } = body;

  try {
    const embedding = await createEmbedding(
      `${input}\n${output}`
    );

    const memory = await prisma.memory.create({
      data: {
        input,
        output,
        embedding_vector: embedding, // ✅ FIXED FIELD
        importance,
        type,
        sessionId,
      },
    });

    return Response.json({ success: true, memory });
  } catch (e: any) {
    return Response.json({ error: e.message });
  }
}

/* =========================
   🧹 DELETE MEMORY
========================= */
export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await prisma.memory.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e.message });
  }
}