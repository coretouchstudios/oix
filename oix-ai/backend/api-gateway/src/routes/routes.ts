import express from "express"
import { health } from "../controllers/healthController"
import { askAI } from "../controllers/aiController"
import { runAgent } from "../controllers/agentController"

const router = express.Router()

router.get("/health",health)

router.post("/ai/ask",askAI)

router.post("/agents/run",runAgent)

export default router
