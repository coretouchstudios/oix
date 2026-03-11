import express from "express"
import evolutionRoutes from "../routes/evolution.routes"

const app = express()

app.use("/evolution",evolutionRoutes)

app.listen(21000,()=>{

 console.log("OIX Self-Evolution Engine running on port 21000")

})
