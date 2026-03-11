
const {Server}=require("socket.io")
const http=require("http")

const server=http.createServer()
const io=new Server(server,{cors:{origin:"*"}})

io.on("connection",(socket)=>{

console.log("Compute node connected:",socket.id)

socket.on("task",async(task)=>{

console.log("Processing task:",task)

const result={
node:socket.id,
output:"Task processed: "+task.prompt
}

socket.emit("result",result)

})

})

server.listen(9100,()=>{

console.log("OIX Compute Node running on 9100")

})

