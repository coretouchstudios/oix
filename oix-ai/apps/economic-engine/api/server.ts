import express from "express"
import economicRoutes from "../routes/economic.routes"

const app = express()

app.use("/economy",economicRoutes)

app.listen(13000,()=>{

 console.log("Economic Engine running on port 13000")

})
