import express from "express"
import { evolveSystem } from "../controllers/evolution.controller"

const router = express.Router()

router.get("/run",evolveSystem)

export default router
