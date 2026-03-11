import express from "express"
import deploymentRoutes from "../routes/deployment.routes"

const app = express()

app.use(express.json())

app.use("/deployments",deploymentRoutes)

app.listen(7000,()=>{

 console.log("Deployment Engine running on port 7000")

})
