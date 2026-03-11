

const express=require("express")
const cors=require("cors")

const agentRoutes=require("./api/routes/agents")
const workflowRoutes=require("./api/routes/workflows")

const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/agents",agentRoutes)
app.use("/api/workflows",workflowRoutes)

app.get("/health",(req,res)=>{

res.json({status:"OIX backend online"})

})

app.listen(5000,()=>{

console.log("OIX Backend running on port 5000")

})


