const { Server } = require("socket.io")

const io = new Server(7900,{
cors:{origin:"*"}
})

console.log("💡 AI Startup Generator Online")

const names = [
"NeuroFlow",
"AgentForge",
"SynthMarket",
"AutoScale",
"CortexAI",
"SignalGrid",
"AtlasMind",
"OrbitAI"
]

const ideas = [
"AI agents that automate customer support",
"Predictive market intelligence for startups",
"Autonomous research assistants for scientists",
"Self‑optimizing cloud infrastructure",
"AI copilots for entrepreneurs",
"AI product design agents",
"Autonomous marketing campaign generators",
"AI systems that discover new SaaS ideas"
]

function generate(){

const idea = {
name: names[Math.floor(Math.random()*names.length)],
description: ideas[Math.floor(Math.random()*ideas.length)],
timestamp: Date.now()
}

console.log("🚀 New AI Startup Idea:",idea.name)

io.emit("startup",idea)

}

setInterval(generate,5000)

io.on("connection",()=>{
console.log("Dashboard connected to startup generator")
})