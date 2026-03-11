export class WorkflowState{

data:any={}

set(id:string,value:any){
this.data[id]=value
}

get(id:string){
return this.data[id]
}

}
