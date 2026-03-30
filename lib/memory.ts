import { prisma } from "@/lib/prisma";
import { getEmbedding } from "@/lib/embed";

/* =========================
   🔍 SIMILARITY SEARCH (SAFE)
========================= */
export async function getRelevantMemories(
  query: string,
  sessionId: string
) {
  if (!query || !sessionId) return [];

  /* =========================
     🧠 CREATE EMBEDDING
  ========================= */
  const embedding = await getEmbedding(query);

  /* =========================
     ⚡ VECTOR SEARCH (SAFE)
  ========================= */
  const memories = await prisma.$queryRaw<
    {
      id: string;
      input: string;
      output: string;
      importance: number;
      createdAt: Date;
      distance: number;
    }[]
  >`
    SELECT 
      id,
      input,
      output,
      importance,
      "createdAt",
      embedding_vector <=> ${embedding}::vector as distance
    FROM "Memory"
    WHERE "sessionId" = ${sessionId}
      AND embedding_vector IS NOT NULL
    ORDER BY embedding_vector <=> ${embedding}::vector
    LIMIT 15;
  `;

  /* =========================
     🧠 RANKING SYSTEM
  ========================= */
  const ranked = memories
    .map((m) => {
      const similarity = 1 - m.distance;

      const score =
        similarity * 0.7 +
        m.importance * 0.2 +
        recencyScore(m.createdAt) * 0.1;

      return { ...m, score };
    })
    .sort((a, b) => b.score - a.score);

  return ranked;
}

/* =========================
   ⏳ RECENCY BOOST
========================= */
function recencyScore(date: Date) {
  const age = Date.now() - new Date(date).getTime();
  const hours = age / (1000 * 60 * 60);

  return Math.max(0, 1 - hours / 24);
}