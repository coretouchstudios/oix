import {Agent} from "../agents/agent"

export class AgentRuntime{

agents:any={}

register(name:string){

this.agents[name]=new Agent()

}

async run(name:string,goal:string){

const agent=this.agents[name]

if(!agent) throw new Error("Agent not registered")

return agent.run(goal)

}

}
