import { AgentTask } from "../types/agentTask"
import { AgentResult } from "../types/agentResult"

export abstract class BaseAgent {

  name:string

  constructor(name:string){
    this.name = name
  }

  abstract execute(task:AgentTask):Promise<AgentResult>

}
