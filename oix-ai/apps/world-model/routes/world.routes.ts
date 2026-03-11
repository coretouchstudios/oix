import express from "express"
import { world } from "../controllers/world.controller"

const router = express.Router()

router.get("/state",world)

export default router
