import express from "express"
import commandRoutes from "../routes/command.routes"

const app = express()

app.use("/command",commandRoutes)

app.listen(15000,()=>{

 console.log("OIX Command Center running on port 15000")

})
