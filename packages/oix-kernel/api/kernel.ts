
import {AgentRuntime} from "../runtime/agents/AgentRuntime"

const runtime=new AgentRuntime()

export async function runAgent(name:string,input:any){
return runtime.run(name,input)
}

