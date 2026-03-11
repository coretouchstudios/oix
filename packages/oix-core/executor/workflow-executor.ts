import {compileGraph,topologicalSort} from "../compiler/graph-compiler"
import {runNodeSandbox} from "../sandbox/node-sandbox"

export async function runWorkflow(flow:any,nodeRegistry:any){

const plan = compileGraph(flow)

const order = topologicalSort(flow.nodes,flow.edges)

const results:any={}

for(const nodeId of order){

const node=flow.nodes.find((n:any)=>n.id===nodeId)

const runtime=nodeRegistry[node.type]

const input=results[nodeId] || node.data

const result = await runtime(input)

results[nodeId]=result

}

return results

}