

const router=require("express").Router()

const AgentEngine=require("../../ai-engine/agentEngine")

const engine=new AgentEngine()

router.post("/run",(req,res)=>{

const result=engine.runAgent(req.body)

res.json(result)

})

module.exports=router


