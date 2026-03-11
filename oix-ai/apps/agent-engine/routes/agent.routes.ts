import express from "express"
import { create,list } from "../controllers/agent.controller"

const router = express.Router()

router.post("/create",create)

router.get("/agents",list)

export default router
