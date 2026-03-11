
const express=require("express")

const router=express.Router()

const {collaborate}=require("../../evolution/mesh/reasoningMesh")

router.post("/",async(req,res)=>{

const {task}=req.body

const result=await collaborate(task)

res.json(result)

})

module.exports=router

