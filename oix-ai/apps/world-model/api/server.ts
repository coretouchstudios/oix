import express from "express"
import worldRoutes from "../routes/world.routes"

const app = express()

app.use("/world",worldRoutes)

app.listen(18000,()=>{

 console.log("OIX World Model running on port 18000")

})
