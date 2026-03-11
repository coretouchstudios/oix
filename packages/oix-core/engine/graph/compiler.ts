export function compileGraph(nodes:any[],edges:any[]){

const map:any = {}

nodes.forEach(n=>{
map[n.id] = {...n,inputs:[],outputs:[]}
})

edges.forEach(e=>{
map[e.source].outputs.push(e.target)
map[e.target].inputs.push(e.source)
})

return map

}
