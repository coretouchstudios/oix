
const express=require("express")
const router=express.Router()

const {routeTask}=require("../../network/router/globalRouter")

router.post("/compute",async(req,res)=>{

const {prompt}=req.body

const result=await routeTask({prompt})

res.json(result)

})

module.exports=router

