export function broadcastMessage(message:any,nodes:any[]){

 console.log("Broadcasting message to network")

 return {

  deliveredTo:nodes.length,
  message

 }

}
