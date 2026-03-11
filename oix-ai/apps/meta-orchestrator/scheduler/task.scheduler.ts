export function scheduleTasks(workflow:any){

 console.log("Scheduling system tasks")

 return workflow.map((task:any,index:number)=>({

  id:(Date.now()+index).toString(),
  layer:task.layer,
  action:task.action,
  priority:Math.floor(Math.random()*10),
  timestamp:Date.now()

 }))

}
