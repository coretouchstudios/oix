import express from "express"
import { report } from "../controllers/economic.controller"

const router = express.Router()

router.get("/report",report)

export default router
