

const {v4:uuid}=require("uuid")

class AgentScheduler{

constructor(){

this.queue=[]

}

schedule(task){

this.queue.push({
id:uuid(),
task
})

console.log("task scheduled")

}

run(){

if(this.queue.length===0)return

const job=this.queue.shift()

console.log("executing job",job.id)

}

}

module.exports=AgentScheduler


