

const router=require("express").Router()

const ModelRouter=require("../services/modelRouter")
const Usage=require("../services/usageTracker")

const routerService=new ModelRouter()
const usage=new Usage()

router.post("/",(req,res)=>{

const prompt=req.body.prompt

const result=routerService.route(prompt)

usage.track(req.apiKey,"chat")

res.json(result)

})

module.exports=router


