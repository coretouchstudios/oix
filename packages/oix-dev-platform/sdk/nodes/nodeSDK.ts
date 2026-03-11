export interface OIXNode{
name:string
execute(input:any):Promise<any>
}

export function createNode(node:OIXNode){
return node
}
