import express from "express"
import { research } from "../controllers/research.controller"

const router = express.Router()

router.get("/discover",research)

export default router
