export class ClusterManager{

nodes:any[]=[]

registerNode(node:any){
this.nodes.push(node)
}

getNodes(){
return this.nodes
}

}
