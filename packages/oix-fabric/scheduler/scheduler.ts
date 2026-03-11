import {nextJob} from "../jobs/jobQueue"

export async function startScheduler(run:(job:any)=>Promise<any>){

while(true){

const job=nextJob()

if(job){
await run(job)
}

await new Promise(r=>setTimeout(r,50))

}

}
