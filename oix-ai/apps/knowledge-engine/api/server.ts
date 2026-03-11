import express from "express"
import knowledgeRoutes from "../routes/knowledge.routes"

const app = express()

app.use("/knowledge",knowledgeRoutes)

app.listen(22000,()=>{

 console.log("OIX Universal Knowledge Engine running on port 22000")

})
