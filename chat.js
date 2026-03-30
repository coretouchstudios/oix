import pkg from "pg";
import { getEmbedding } from "./embed.js";

const { Client } = pkg;

const client = new Client({
  connectionString: "YOUR_SUPABASE_DB_URL",
});

await client.connect();

export async function getRelevantMemory(query) {
  const embedding = await getEmbedding(query);

  const res = await client.query(
    `SELECT input, output
     FROM "Memory"
     ORDER BY embedding <-> $1
     LIMIT 5`,
    [embedding]
  );

  return res.rows;
}