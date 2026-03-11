import express from "express"
import { improve } from "../controllers/self.controller"

const router = express.Router()

router.get("/improve",improve)

export default router
