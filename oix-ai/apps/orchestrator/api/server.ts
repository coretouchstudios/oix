import express from "express"
import orchestratorRoutes from "../routes/orchestrator.routes"

const app = express()

app.use(express.json())

app.use("/orchestrator",orchestratorRoutes)

app.listen(8000,()=>{

 console.log("Platform Orchestrator running on port 8000")

})
