import express from "express"
import { dashboard } from "../controllers/command.controller"

const router = express.Router()

router.get("/dashboard",dashboard)

export default router
