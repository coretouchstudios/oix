import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "agent-runtime-ok"
  });
});

app.post("/run", async (req, res) => {

  console.log("Agent task received:", req.body);

  res.json({
    success: true,
    message: "Agent executed",
    input: req.body
  });

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Agent Runtime running on ${PORT}`);
});