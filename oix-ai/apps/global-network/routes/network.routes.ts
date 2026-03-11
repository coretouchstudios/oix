import express from "express"
import { register,status } from "../controllers/network.controller"

const router = express.Router()

router.post("/register",register)
router.get("/status",status)

export default router
