export class Scheduler{

queue:any[]=[]

add(task:any){

this.queue.push(task)

}

next(){

return this.queue.shift()

}

}
