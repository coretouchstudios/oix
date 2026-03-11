export async function* runStreamingWorkflow(flow:any,nodeRegistry:any){

for(const node of flow.nodes){

yield {

event:"node_start",
node:node.id

}

const runtime=nodeRegistry[node.type]

const result=await runtime(node.data)

yield {

event:"node_result",
node:node.id,
result

}

}

yield {

event:"workflow_complete"

}

}