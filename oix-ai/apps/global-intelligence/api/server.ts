import express from "express"
import intelligenceRoutes from "../routes/intelligence.routes"

const app = express()

app.use("/intelligence",intelligenceRoutes)

app.listen(10000,()=>{

 console.log("Global Intelligence Layer running on port 10000")

})
