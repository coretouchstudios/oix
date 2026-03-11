import { TaskQueue } from "../tasks/taskQueue"
import { AgentRegistry } from "../registry/agentRegistry"
import { AgentTask } from "../types/agentTask"

export class AgentManager {

  queue = new TaskQueue()

  registry = new AgentRegistry()

  async run(){

    while(this.queue.size() > 0){

      const task = this.queue.next()

      if(!task) return

      const agent = this.registry.get(task.description)

      if(!agent){
        console.log("No agent found for task:",task.description)
        continue
      }

      const result = await agent.execute(task)

      console.log("Task result:",result)

    }

  }

}
