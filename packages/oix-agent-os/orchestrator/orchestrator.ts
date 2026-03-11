import {AgentRuntime} from "../runtime/runtime"

export class MultiAgentOrchestrator{

runtime=new AgentRuntime()

async runWorkflow(workflow:any){

const results:any={}

for(const step of workflow){

const result=await this.runtime.run(step.agent,step.goal)

results[step.agent]=result

}

return results

}

}
