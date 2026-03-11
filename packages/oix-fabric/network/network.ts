export class FabricNetwork{

agents:any={}

registerAgent(id:string,agent:any){
this.agents[id]=agent
}

sendMessage(to:string,message:any){

const agent=this.agents[to]

if(agent){
agent.receive(message)
}

}

}
