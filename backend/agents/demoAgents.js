const { v4: uuid } = require("uuid")

console.log("🤖 AI Agent Cluster Online")

setInterval(() => {

  const task = [
    "Research AI startups",
    "Generate product idea",
    "Analyze market trends",
    "Summarize research",
    "Create pitch deck outline"
  ]

  const agent = uuid().slice(0,6)
  const work = task[Math.floor(Math.random()*task.length)]

  console.log(`Agent ${agent} executing task: ${work}`)

},3000)