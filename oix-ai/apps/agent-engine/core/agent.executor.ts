import { getTasks } from "../tasks/task.queue"

export function runAgents(){

 const tasks = getTasks()

 tasks.forEach(task=>{

  console.log("Executing task:",task.description)

 })

}
