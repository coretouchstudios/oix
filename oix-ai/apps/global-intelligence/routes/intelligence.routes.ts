import express from "express"
import { scan } from "../controllers/intelligence.controller"

const router = express.Router()

router.get("/scan",scan)

export default router
