import express from "express"
import { evaluate } from "../controllers/governance.controller"

const router = express.Router()

router.post("/evaluate",evaluate)

export default router
