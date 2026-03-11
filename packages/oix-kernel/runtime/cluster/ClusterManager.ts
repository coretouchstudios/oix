
export class ClusterManager{

nodes:string[]=[]

register(node:string){
this.nodes.push(node)
}

schedule(task:any){
const node=this.nodes[Math.floor(Math.random()*this.nodes.length)]
return {node,task}
}

}

