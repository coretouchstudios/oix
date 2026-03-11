import {addJob} from "../jobs/jobQueue"
import {startScheduler} from "../scheduler/scheduler"

export class FabricRuntime{

async submit(job:any){

addJob(job)

}

async start(run:(job:any)=>Promise<any>){

startScheduler(run)

}

}
