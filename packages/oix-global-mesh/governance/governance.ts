let governance:any={}

export function registerNode(node:any){

governance[node.id]=node

}

export function listNodes(){

return Object.values(governance)

}
