import { Router } from "express"
import { runAgent } from "../controllers/agentController.js"

const router = Router()

router.post("/run", runAgent)

export default router