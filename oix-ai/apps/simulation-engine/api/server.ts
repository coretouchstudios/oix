import express from "express"
import simulationRoutes from "../routes/simulation.routes"

const app = express()

app.use("/simulation",simulationRoutes)

app.listen(17000,()=>{

 console.log("OIX Simulation Engine running on port 17000")

})
