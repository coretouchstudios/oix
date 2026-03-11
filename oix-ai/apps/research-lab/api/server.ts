import express from "express"
import researchRoutes from "../routes/research.routes"

const app = express()

app.use("/research",researchRoutes)

app.listen(16000,()=>{

 console.log("OIX Autonomous Research Lab running on port 16000")

})
