

const KeyStore=require("../storage/keyStore")

const store=new KeyStore()

module.exports=(req,res,next)=>{

const key=req.headers["x-api-key"]

if(!key) return res.status(401).json({error:"missing api key"})

const valid=store.validate(key)

if(!valid) return res.status(403).json({error:"invalid api key"})

req.apiKey=key

next()

}


