

const router=require("express").Router()

router.post("/run",(req,res)=>{

res.json({

status:"agent executed",
input:req.body

})

})

module.exports=router


