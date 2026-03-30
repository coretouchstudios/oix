import pkg from "pg";
import { getEmbedding } from "./embed.js";

const { Client } = pkg;

// ✅ Use env variable (BEST PRACTICE)
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ connect once
await client.connect();

// =========================
// 💾 SAVE MEMORY
// =========================
export async function saveMemory(input, output) {
  const embedding = await getEmbedding(input);

  await client.query(
    `INSERT INTO "Memory" (input, output, embedding_vector)
     VALUES ($1, $2, $3)`,
    [input, output, embedding]
  );
}

// =========================
// 🔍 SEARCH MEMORY
// =========================
export async function searchMemory(query) {
  const embedding = await getEmbedding(query);

  const res = await client.query(
    `SELECT input, output
     FROM "Memory"
     ORDER BY embedding_vector <-> $1
     LIMIT 5`,
    [embedding]
  );

  return res.rows;
}