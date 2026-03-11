import express from "express"
import agentRoutes from "./routes/agent.routes"

const app = express()

app.use(express.json())

app.use("/agents",agentRoutes)

app.listen(5000,()=>{

 console.log("Agent Engine running on port 5000")

})
