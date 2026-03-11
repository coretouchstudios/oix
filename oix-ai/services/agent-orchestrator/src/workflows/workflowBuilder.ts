import { Workflow } from "../types/workflow"
import { WorkflowTask } from "../types/workflowTask"

export class WorkflowBuilder {

 private tasks:WorkflowTask[] = []

 addTask(task:WorkflowTask){

  this.tasks.push(task)

  return this

 }

 build(name:string):Workflow{

  return {

   name,

   tasks:this.tasks

  }

 }

}
