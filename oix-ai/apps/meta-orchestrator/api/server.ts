import express from "express"
import orchestratorRoutes from "../routes/orchestrator.routes"

const app = express()

app.use("/orchestrator",orchestratorRoutes)

app.listen(19000,()=>{

 console.log("OIX Meta-Orchestrator running on port 19000")

})
