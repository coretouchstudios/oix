export function executeTasks(tasks:any){

 console.log("Executing orchestrated tasks")

 const results = tasks.map((task:any)=>({

  task:task.action,
  layer:task.layer,
  status:"executed"

 }))

 return results

}
