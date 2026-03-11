

const router=require("express").Router()

const Store=require("../storage/keyStore")

const store=new Store()

router.post("/",(req,res)=>{

const key=store.create()

res.json({apiKey:key})

})

module.exports=router


