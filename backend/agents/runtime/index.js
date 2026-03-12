import express from "express";
import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const redis = new Redis(process.env.REDIS_URL);

app.get("/", (req, res) => {
  res.json({
    service: "OIX Agent Runtime",
    status: "running"
  });
});

app.post("/run-agent", async (req, res) => {
  const { agentId, task } = req.body;

  console.log("Running agent:", agentId);

  // placeholder
  const result = {
    agentId,
    task,
    output: "Agent executed successfully"
  };

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Agent Runtime running on ${PORT}`);
});