const queue:any[]=[]

export function addJob(job:any){
queue.push(job)
}

export function getJob(){
return queue.shift()
}
