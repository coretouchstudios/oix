import {getJob} from "./queue"
import {runWorkflow} from "../engine/executor/deterministicExecutor"

export async function startWorker(){

while(true){

const job=getJob()

if(job){
await runWorkflow(job)
}

await new Promise(r=>setTimeout(r,100))

}

}
