

require("dotenv").config()

const express=require("express")
const cors=require("cors")

const {runAgent}=require("../ai-engine/agent")

const app=express()

app.use(cors())
app.use(express.json())

app.get("/ai/run",async(req,res)=>{

 const result=await runAgent("Explain AI agents")

 res.json({result})

})

app.listen(4000,()=>{
 console.log("API running on 4000")
})

const {execute}=require("../orchestrator/workflow")

app.post("/workflow/run",async(req,res)=>{

 const result=await execute(req.body.nodes)

 res.json({result})

})


const {runAutonomous}=require("../meta-agents/autonomous")

app.post("/autonomous/run",async(req,res)=>{

 const goal=req.body.goal

 const result=await runAutonomous(goal)

 res.json(result)

})