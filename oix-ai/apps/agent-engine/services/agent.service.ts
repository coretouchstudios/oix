import { registerAgent,listAgents } from "../agents/agent.registry"

export function createAgent(agent:any){

 return registerAgent(agent)

}

export function getAgents(){

 return listAgents()

}
