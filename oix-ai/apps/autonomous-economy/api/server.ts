import express from "express"
import economyRoutes from "../routes/economy.routes"

const app = express()

app.use("/economy",economyRoutes)

app.listen(20000,()=>{

 console.log("OIX Autonomous Economy running on port 20000")

})
