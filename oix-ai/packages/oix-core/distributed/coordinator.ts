import {addJob} from "./queue"

export function scheduleWorkflow(workflow:any){

addJob(workflow)

return {status:"queued"}

}
