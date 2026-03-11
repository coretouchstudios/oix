import express from "express"
import governanceRoutes from "../routes/governance.routes"

const app = express()

app.use(express.json())

app.use("/governance",governanceRoutes)

app.listen(12000,()=>{

 console.log("AI Governance Layer running on port 12000")

})
