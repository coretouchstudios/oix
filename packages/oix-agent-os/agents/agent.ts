import {Planner} from "../planner/planner"
import {runTool} from "../tools/toolRegistry"
import {AgentMemory} from "../memory/agentMemory"
import {Reflection} from "../reflection/reflection"

export class Agent{

planner=new Planner()
memory=new AgentMemory()
reflection=new Reflection()

async run(goal:string){

const plan=this.planner.plan(goal)

let result:any=null

for(const step of plan){

result=await runTool(step.step,step.input)

this.memory.add({
step:step.step,
result
})

const check=this.reflection.reflect(result)

if(check.retry){
result=await runTool(step.step,step.input)
}

}

return result

}

}
