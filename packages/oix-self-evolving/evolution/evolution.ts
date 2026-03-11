import {mutateAgent} from "../agentFactory/mutation"
import {optimizeWorkflow} from "../workflowOptimizer/optimizer"

export function evolveSystem(system:any){

system.agents=system.agents.map((a:any)=>mutateAgent(a))

system.workflows=system.workflows.map((w:any)=>optimizeWorkflow(w))

system.evolved=true

return system

}
