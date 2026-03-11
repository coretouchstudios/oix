import express from "express"
import { services } from "../services/service.registry"
import { proxyRequest } from "../services/proxy.service"

const router = express.Router()

router.use((req,res)=>{

 proxyRequest(services.agentEngine,req,res)

})

export default router
