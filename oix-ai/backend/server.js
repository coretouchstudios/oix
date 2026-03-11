const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("OIX AI Backend Running")
})

app.get("/api/status",(req,res)=>{
    res.json({
        system:"OIX",
        status:"online",
        ai:"active"
    })
})

const PORT = 5000

app.listen(PORT,()=>{
    console.log("🚀 OIX Backend running on port",PORT)
})
