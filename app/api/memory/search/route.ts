import { prisma } from "@/lib/prisma";
import { getEmbedding } from "@/lib/embed";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* =========================
   🔍 HYBRID MEMORY SEARCH
========================= */
export async function POST(req: Request) {
  try {
    const { query, sessionId } = await req.json();

    if (!query) {
      return Response.json({ error: "Missing query" }, { status: 400 });
    }

    /* =========================
       🧠 EMBEDDING
    ========================= */
    const embedding = await getEmbedding(query);

    /* =========================
       🔤 FULL-TEXT QUERY
    ========================= */
    const tsQuery = query
      .split(" ")
      .map((w: string) => `${w}:*`)
      .join(" & ");

    /* =========================
       ⚡ HYBRID QUERY (SAFE)
    ========================= */
    const memories = await prisma.$queryRaw<
      {
        id: string;
        input: string;
        output: string;
        importance: number;
        type: string;
        createdAt: Date;
        distance: number;
        text_rank: number;
      }[]
    >`
      SELECT
        id,
        input,
        output,
        importance,
        type,
        "createdAt",

        /* semantic */
        embedding_vector <=> ${embedding}::vector AS distance,

        /* lexical */
        ts_rank(
          to_tsvector('english', coalesce(input,'') || ' ' || coalesce(output,'')),
          to_tsquery('english', ${tsQuery})
        ) AS text_rank

      FROM "Memory"

      WHERE embedding_vector IS NOT NULL
      ${
        sessionId
          ? prisma.$queryRaw`AND ("sessionId" = ${sessionId} OR type = 'long')`
          : prisma.$queryRaw``
      }

      ORDER BY
        (embedding_vector <=> ${embedding}::vector) ASC,
        text_rank DESC

      LIMIT 20;
    `;

    /* =========================
       🧠 HYBRID SCORING
    ========================= */
    const enriched = memories
      .map((m) => {
        const similarity = 1 - m.distance;

        const recency =
          Math.max(
            0,
            1 -
              (Date.now() - new Date(m.createdAt).getTime()) /
                (1000 * 60 * 60 * 24)
          );

        const score =
          similarity * 0.55 +     // semantic
          m.text_rank * 0.25 +    // lexical
          m.importance * 0.15 +   // memory weight
          recency * 0.05;         // freshness

        let reason = "Semantic match";

        if (m.text_rank > 0.1) {
          reason = "Keyword + semantic";
        }

        if (m.importance > 0.8) {
          reason += " • high importance";
        }

        return { ...m, score, reason };
      })
      .sort((a, b) => b.score - a.score);

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

Rules:
- Merge insights
- Remove repetition
- Keep high-signal info
- Optimize for AI agents
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
    } catch (e) {
      console.error("Synthesis error:", e);
    }

    /* =========================
       🚀 RESPONSE
    ========================= */
    return Response.json({
      success: true,
      results: enriched,
      synthesized,
      rawTop: enriched.slice(0, 5),
    });
  } catch (e: any) {
    return Response.json(
      { error: e.message },
      { status: 500 }
    );
  }
}