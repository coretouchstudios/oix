import express from "express"
import { deploy,list } from "../controllers/deployment.controller"

const router = express.Router()

router.post("/deploy",deploy)

router.get("/deployments",list)

export default router
