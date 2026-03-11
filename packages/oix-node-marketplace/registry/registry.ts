let registry:any[]=[]

export function publishNode(node:any){

registry.push({
...node,
downloads:0,
rating:0
})

return {status:"published",node}

}

export function getNodes(){

return registry

}

export function findNode(name:string){

return registry.find(n=>n.name===name)

}
