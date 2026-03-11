export function createCollaboration(venture:any,nodes:any[]){

 console.log("Creating global collaboration")

 return {

  venture:venture.name,
  collaboratingNodes:nodes.length,
  status:"initiated"

 }

}
