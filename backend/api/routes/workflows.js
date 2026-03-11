

const router=require("express").Router()

const Orchestrator=require("../../orchestrator/orchestrator")

const orch=new Orchestrator()

router.post("/run",(req,res)=>{

const result=orch.runWorkflow(req.body)

res.json(result)

})

module.exports=router


