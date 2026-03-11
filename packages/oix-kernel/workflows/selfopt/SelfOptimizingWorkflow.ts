
export class SelfOptimizingWorkflow{

history:any[]=[]

record(run:any){
this.history.push(run)
}

optimize(){
return "workflow optimized"
}

}

