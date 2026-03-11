export class AgentNetwork{

nodes:any[]=[]

connect(agent:any){

this.nodes.push(agent)

}

list(){

return this.nodes

}

}
