import express from "express"
import cognitiveRoutes from "../routes/cognitive.routes"

const app = express()

app.use(express.json())

app.use("/cognitive",cognitiveRoutes)

app.listen(9000,()=>{

 console.log("AI Cognitive Layer running on port 9000")

})
