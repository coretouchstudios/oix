const { Server } = require("socket.io")

const io = new Server(7700, {
  cors: { origin: "*" }
})

console.log("🧠 Live Token Reasoning Stream Running")

const tokens = [
"build","ai","platform","agent","memory",
"compute","model","workflow","optimize","deploy"
]

setInterval(()=>{

const event = {
token: tokens[Math.floor(Math.random()*tokens.length)],
node: Math.floor(Math.random()*6),
timestamp: Date.now()
}

io.emit("token",event)

},400)

io.on("connection",socket=>{
console.log("Dashboard connected to token stream")
})