import express from "express"
import networkRoutes from "../routes/network.routes"

const app = express()

app.use(express.json())

app.use("/network",networkRoutes)

app.listen(14000,()=>{

 console.log("Global AI Network running on port 14000")

})
