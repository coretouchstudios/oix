import {compileGraph} from "./graphCompiler"
import {runNode} from "./nodeRunner"

export async function executeWorkflow({nodes,edges,emit}:any){

const graph = compileGraph(nodes,edges)

for(const id in graph){

const node = graph[id]

const result = await runNode(node)

emit({
node:id,
result
})

}

}