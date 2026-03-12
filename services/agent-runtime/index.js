const express = require("express")
const { runAgent } = require("./agentRunner")

const app = express()
app.use(express.json())

app.get("/health",(req,res)=>{
  res.json({
    status:"ok",
    service:"agent-runtime"
  })
})

app.post("/run", async (req,res)=>{

  try{

    const result = await runAgent(req.body)

    res.json(result)

  }catch(err){

    console.error("RUNTIME ERROR:",err)

    res.status(500).json({
      error:"Agent execution failed"
    })

  }

})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
  console.log(`Agent Runtime running on ${PORT}`)
})