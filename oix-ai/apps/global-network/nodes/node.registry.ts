const nodes:any[] = []

export function registerNode(node:any){

 console.log("Registering node:",node.region)

 nodes.push(node)

 return nodes

}

export function getNodes(){

 return nodes

}
