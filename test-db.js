import "dotenv/config";
import pkg from "pg";

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function run() {
  try {
    console.log("DB URL:", process.env.DATABASE_URL); // debug

    await client.connect();

    const res = await client.query("SELECT NOW()");
    console.log("✅ DB Connected:", res.rows);

    await client.end();
  } catch (err) {
    console.error("❌ DB ERROR:", err);
  }
}

run();