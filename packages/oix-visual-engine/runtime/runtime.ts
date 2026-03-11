import {executeWorkflow} from "../executor/executor"

export class VisualRuntime{

async run(workflow:any,emit:(data:any)=>void){

return executeWorkflow({
...workflow,
emit
})

}

}
