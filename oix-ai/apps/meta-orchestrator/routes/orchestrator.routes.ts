import express from "express"
import { run } from "../controllers/orchestrator.controller"

const router = express.Router()

router.get("/run",run)

export default router
