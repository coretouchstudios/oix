import express from "express"
import { createItem, getItems } from "../controllers/marketplace.controller"

const router = express.Router()

router.post("/publish",createItem)

router.get("/items",getItems)

export default router
