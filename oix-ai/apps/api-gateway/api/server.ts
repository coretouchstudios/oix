import express from "express"
import agentsRoutes from "../routes/agents.routes"
import marketplaceRoutes from "../routes/marketplace.routes"
import { requestLogger } from "../middleware/logger.middleware"

const app = express()

app.use(express.json())
app.use(requestLogger)

app.use("/agents",agentsRoutes)
app.use("/marketplace",marketplaceRoutes)

app.get("/health",(req,res)=>{

 res.json({status:"OIX Gateway Running"})

})

app.listen(3000,()=>{

 console.log("OIX API Gateway running on port 3000")

})
