const { Server } = require("socket.io")

const io = new Server(7800,{
cors:{origin:"*"}
})

console.log("🧬 Self‑Evolving Agent Swarm Online")

let agents = [
{ id:"root", parent:null }
]

let history = []

function snapshot(){

history.push(JSON.parse(JSON.stringify(agents)))

}

function createAgent(parent){

const id = Math.random().toString(16).slice(2,8)

const agent = {
id,
parent
}

agents.push(agent)

snapshot()

io.emit("agentCreated",agent)

console.log(`🤖 Agent spawned → ${id}`)

}

snapshot()

setInterval(()=>{

const parent =
agents[Math.floor(Math.random()*agents.length)].id

createAgent(parent)

},2500)

io.on("connection",socket=>{

socket.emit("history",history)

})