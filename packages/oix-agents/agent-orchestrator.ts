import {Agent} from "./agent-runtime"

export class AgentOrchestrator {

agents:Agent[]

constructor(agents:Agent[]){

this.agents=agents

}

async run(task:string){

let context=task

for(const agent of this.agents){

const res=await agent.run(context)

context=res

}

return context

}

}