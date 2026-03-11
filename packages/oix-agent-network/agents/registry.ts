import {Agent} from "../agents/agent"

export class AgentRegistry{

agents:any={}

register(agent:Agent){
this.agents[agent.id]=agent
}

get(id:string){
return this.agents[id]
}

list(){
return Object.values(this.agents)
}

}
