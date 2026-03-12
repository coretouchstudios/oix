require("dotenv").config();

const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health");
const agentRoutes = require("./routes/agents");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/agents", agentRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`OIX API Gateway running on port ${PORT}`);
});