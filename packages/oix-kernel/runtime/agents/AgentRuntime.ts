
export class AgentRuntime{

agents:Map<string,any>=new Map()

register(name:string,agent:any){
this.agents.set(name,agent)
}

async run(name:string,input:any){
const agent=this.agents.get(name)
if(!agent) throw new Error("agent not found")
return await agent.run(input)
}

}

