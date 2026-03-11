const { Server } = require("socket.io")

function startReasoning(server){

const io = new Server(server,{cors:{origin:"*"}})

setInterval(()=>{

io.emit("reasoning",{
step:"Analyzing prompt",
confidence:Math.random()
})

},2000)

}

module.exports={startReasoning}