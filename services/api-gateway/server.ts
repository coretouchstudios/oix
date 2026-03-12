import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import healthRoutes from "./routes/health.js"
import agentRoutes from "./routes/agents.js"
import taskRoutes from "./routes/tasks.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/health", healthRoutes)
app.use("/agents", agentRoutes)
app.use("/tasks", taskRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`)
})