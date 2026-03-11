import { generateWorkflow } from "../workflows/workflow.engine"
import { scheduleTasks } from "../scheduler/task.scheduler"
import { executeTasks } from "../execution/execution.engine"

export function runOrchestrator(){

 const workflow = generateWorkflow()

 const tasks = scheduleTasks(workflow)

 const results = executeTasks(tasks)

 return {

  workflow,
  tasks,
  results

 }

}
