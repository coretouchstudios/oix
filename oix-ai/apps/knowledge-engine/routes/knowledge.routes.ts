import express from "express"
import { knowledge } from "../controllers/knowledge.controller"

const router = express.Router()

router.get("/state",knowledge)

export default router
