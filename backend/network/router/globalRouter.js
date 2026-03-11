
const {io}=require("socket.io-client")

let nodes=[]

function connectNode(url){

const socket=io(url)

socket.on("connect",()=>{

console.log("Connected node:",url)

nodes.push(socket)

})

}

async function routeTask(task){

if(nodes.length===0)
return {error:"No compute nodes available"}

const node=nodes[Math.floor(Math.random()*nodes.length)]

return new Promise((resolve)=>{

node.emit("task",task)

node.once("result",(res)=>{

resolve(res)

})

})

}

module.exports={connectNode,routeTask}

