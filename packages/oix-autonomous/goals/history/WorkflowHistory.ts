
export class WorkflowHistory{

runs:any[]=[]

record(run:any){
this.runs.push(run)
}

patterns(){
return this.runs.slice(-10)
}

}

