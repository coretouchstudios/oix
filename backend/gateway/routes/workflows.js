

const router=require("express").Router()

router.post("/run",(req,res)=>{

res.json({

status:"workflow executed",
workflow:req.body

})

})

module.exports=router


