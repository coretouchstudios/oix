export class DevRuntime{

nodes:any[]=[]
agents:any[]=[]

registerNode(node:any){
this.nodes.push(node)
}

registerAgent(agent:any){
this.agents.push(agent)
}

status(){
return{
nodes:this.nodes.length,
agents:this.agents.length
}
}

}
