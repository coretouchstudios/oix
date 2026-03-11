import {OIXWorkflow} from "../types/workflow-types"

export function compileGraph(flow:OIXWorkflow){

const adjacency:any={}

flow.nodes.forEach(node=>{

adjacency[node.id]=[]

})

flow.edges.forEach(edge=>{

adjacency[edge.source].push(edge.target)

})

return adjacency

}