import express from "express"
import { create,list } from "../controllers/venture.controller"

const router = express.Router()

router.post("/create",create)

router.get("/startups",list)

export default router
