export async function getWorkflows(){
return[
{id:"wf-1",name:"AI Research Agent",status:"running",executions:1240},
{id:"wf-2",name:"Content Generator",status:"idle",executions:321}
]
}
export async function getWorkflowExecutions(id:string){
return[
{id:"ex-1",workflow:id,status:"success",duration:1200}
]
}
