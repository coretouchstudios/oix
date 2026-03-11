import express from "express"
import marketplaceRoutes from "./routes/marketplace.routes"

const app = express()

app.use(express.json())

app.use("/marketplace",marketplaceRoutes)

app.listen(4000,()=>{

 console.log("Marketplace running on port 4000")

})
