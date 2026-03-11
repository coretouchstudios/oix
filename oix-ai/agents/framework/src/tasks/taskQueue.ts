import { AgentTask } from "../types/agentTask"

export class TaskQueue {

  private queue:AgentTask[] = []

  add(task:AgentTask){
    this.queue.push(task)
  }

  next():AgentTask | undefined{
    return this.queue.shift()
  }

  size(){
    return this.queue.length
  }

}
