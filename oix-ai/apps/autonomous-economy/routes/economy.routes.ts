import express from "express"
import { economy } from "../controllers/economy.controller"

const router = express.Router()

router.get("/state",economy)

export default router
