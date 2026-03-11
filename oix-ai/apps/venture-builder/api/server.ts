import express from "express"
import ventureRoutes from "../routes/venture.routes"

const app = express()

app.use(express.json())

app.use("/ventures",ventureRoutes)

app.listen(6000,()=>{

 console.log("Venture Builder running on port 6000")

})
