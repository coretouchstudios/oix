import { Workflow } from "../types/workflow"
import { AgentManager } from "../../../agents/framework/src/core/agentManager"

export class WorkflowRunner {

 manager = new AgentManager()

 async run(workflow:Workflow){

  for(const task of workflow.tasks){

   this.manager.queue.add({
    id:task.id,
    description:task.agent,
    input:task.input
   })

  }

  await this.manager.run()

 }

}
