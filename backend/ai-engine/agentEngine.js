

const Memory=require("./memory")

class AgentEngine{

constructor(){

this.memory=new Memory()

}

runAgent(task){

console.log("Running agent:",task)

this.memory.store(task)

return{

status:"executed",
task

}

}

}

module.exports=AgentEngine


