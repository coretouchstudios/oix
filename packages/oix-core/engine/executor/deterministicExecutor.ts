import {compileGraph} from "../graph/compiler"
import {runNode} from "../runtime/nodeRuntime"

export async function runWorkflow({nodes,edges,emit}:any){

const graph=compileGraph(nodes,edges)
const executed=new Set()

async function executeNode(id:string){

if(executed.has(id)) return

const node=graph[id]

for(const input of node.inputs){
await executeNode(input)
}

const result=await runNode(node)

emit({node:id,result})

executed.add(id)

for(const out of node.outputs){
await executeNode(out)
}

}

const roots=Object.values(graph).filter((n:any)=>n.inputs.length===0)

for(const root:any of roots){
await executeNode(root.id)
}

}
