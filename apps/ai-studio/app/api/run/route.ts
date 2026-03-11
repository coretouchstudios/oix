import {executeWorkflow} from "@/lib/engine/executor"

export async function POST(req:Request){

const body = await req.json()

let logs:any[] = []

await executeWorkflow({
nodes:body.nodes,
edges:body.edges,
emit:(log:any)=>logs.push(log)
})

return Response.json({
logs
})

}