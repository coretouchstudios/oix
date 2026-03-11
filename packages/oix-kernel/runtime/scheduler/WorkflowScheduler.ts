
export class WorkflowScheduler{

queue:any[]=[]

enqueue(job:any){
this.queue.push(job)
}

next(){
return this.queue.shift()
}

}

