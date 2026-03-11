

const Memory=require("../memory/vectorMemory")

class AgentEngine{

constructor(){

this.memory=new Memory()

}

execute(task){

console.log("Executing",task.agent)

this.memory.store(task.goal)

}

}

module.exports=AgentEngine

