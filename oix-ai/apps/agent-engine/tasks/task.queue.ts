import { Task } from "./task.model"

const tasks:Task[] = []

export function addTask(task:Task){

 tasks.push(task)

 return task

}

export function getTasks(){

 return tasks

}
