let jobs:any[]=[]

export function addJob(job:any){
jobs.push(job)
}

export function nextJob(){
return jobs.shift()
}
