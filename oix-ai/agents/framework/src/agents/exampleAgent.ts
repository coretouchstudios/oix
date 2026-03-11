import { BaseAgent } from "../core/baseAgent"
import { AgentTask } from "../types/agentTask"
import { AgentResult } from "../types/agentResult"

export class ExampleAgent extends BaseAgent {

  constructor(){
    super("example-task")
  }

  async execute(task:AgentTask):Promise<AgentResult>{

    return {
      taskId:task.id,
      output:"Example agent completed task"
    }

  }

}
