import cron from "node-cron"
import {runWorkflow} from "../../packages/oix-engine/workflow"

export function scheduleWorkflow(flow:any){

cron.schedule(flow.cron,()=>{

runWorkflow(flow.nodes,flow.edges)

})

}