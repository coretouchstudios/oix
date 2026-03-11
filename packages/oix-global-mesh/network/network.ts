export class MeshNetwork{

nodes:any[]=[]

connect(node:any){

this.nodes.push(node)

}

list(){

return this.nodes

}

}
