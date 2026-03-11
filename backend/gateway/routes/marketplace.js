
const express=require("express")
const router=express.Router()
const {v4:uuid}=require("uuid")
const db=require("../../marketplace/marketplaceDB")

router.post("/publish",(req,res)=>{

const {name,type,description}=req.body

const app={
id:uuid(),
name,
type,
description,
created:Date.now()
}

db.add(app)

res.json({status:"published",app})

})

router.get("/apps",(req,res)=>{

const apps=db.list()

res.json(apps)

})

module.exports=router

