import {buildGraph} from "../graph/buildGraph"
import {runNode} from "../nodes/runNode"
import {WorkflowState} from "../state/workflowState"
import {Debugger} from "../debug/debugger"

export async function executeWorkflow({nodes,edges,emit}:any){

const graph=buildGraph(nodes,edges)

const state=new WorkflowState()

const debug=new Debugger()

const executed=new Set()

async function execute(id:string){

if(executed.has(id)) return

const node=graph[id]

for(const input of node.inputs){
await execute(input)
}

const inputData=node.inputs.map((i:string)=>state.get(i)).join(" ")

debug.emit({node:id,status:"running"})

const result=await runNode(node,inputData)

state.set(id,result)

emit({
node:id,
result
})

debug.emit({
node:id,
status:"complete",
result
})

executed.add(id)

for(const out of node.outputs){
await execute(out)
}

}

const roots=Object.values(graph).filter((n:any)=>n.inputs.length===0)

for(const r:any of roots){
await execute(r.id)
}

return {
state:state.data,
debug:debug.getEvents()
}

}
