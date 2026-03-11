import express from "express"
import { simulate } from "../controllers/simulation.controller"

const router = express.Router()

router.get("/run",simulate)

export default router
