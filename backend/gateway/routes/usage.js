

const router=require("express").Router()

const Usage=require("../services/usageTracker")

const usage=new Usage()

router.get("/",(req,res)=>{

res.json(usage.getUsage(req.apiKey))

})

module.exports=router


