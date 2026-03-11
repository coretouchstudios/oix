
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const globalCompute=require("./routes/globalCompute")
const {connectNode}=require("../network/router/globalRouter")

const chatRoutes = require("./routes/chat")
const agentRoutes = require("./routes/agents")
const workflowRoutes = require("./routes/workflows")
const usageRoutes = require("./routes/usage")
const keyRoutes = require("./routes/keys")
const reasonRoutes = require("./routes/reason")

const auth = require("./middleware/auth")
const rateLimit = require("./middleware/rateLimit")
const marketplaceRoutes=require("./routes/marketplace")
const platformRoutes=require("./routes/platform")

const app = express()

app.use(cors())
app.use(express.json())
connectNode("http://localhost:9100")
connectNode("http://node1:9100")
connectNode("http://node2:9100")
connectNode("http://node3:9100")

app.use(rateLimit)

// API KEY CREATION (NO AUTH)
app.use("/v1/api-keys", keyRoutes)

// Protected routes
app.use("/v1/chat", auth, chatRoutes)
app.use("/v1/agents", auth, agentRoutes)
app.use("/v1/workflows", auth, workflowRoutes)
app.use("/v1/usage", auth, usageRoutes)
app.use("/v1/reason",auth,reasonRoutes)
app.use("/v1/marketplace",marketplaceRoutes)
app.use("/v1/global",globalCompute)
app.use("/v1/platform",platformRoutes)

app.get("/", (req,res)=>{
  res.send("🚀 OIX AI Gateway Online")
})

app.get("/health",(req,res)=>{
  res.json({status:"ok"})
})

app.listen(7000,()=>{
  console.log("====================================")
  console.log("🚀 OIX AI Gateway Running")
  console.log("====================================")
  console.log("Gateway URL: http://localhost:7000")
  console.log("Health:      http://localhost:7000/health")
  console.log("====================================")
})