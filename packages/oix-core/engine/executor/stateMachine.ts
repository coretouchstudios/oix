export class WorkflowState{

state:any={}

setNodeResult(id:string,result:any){
this.state[id]=result
}

getNodeResult(id:string){
return this.state[id]
}

}
