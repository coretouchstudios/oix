import express from "express"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    service: "agent-runtime",
    status: "running"
  })
})

app.post("/run-agent", async (req, res) => {

  const { agent, input } = req.body

  console.log("Running agent:", agent)

  res.json({
    result: "agent executed",
    input
  })

})

app.listen(3000, () => {
  console.log("Agent Runtime running on port 3000")
})