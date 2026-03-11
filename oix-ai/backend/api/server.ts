import express from 'express'

const app = express()

app.get('/health', (req,res)=>{
  res.json({status:"OIX API running"})
})

app.listen(4000,()=>{
  console.log("OIX API Gateway running on 4000")
})
