import { Agent } from "./agent.model"

const agents:Agent[] = []

export function registerAgent(agent:Agent){

 agents.push(agent)

 return agent

}

export function listAgents(){

 return agents

}
