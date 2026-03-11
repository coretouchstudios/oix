

const AgentEngine=require("../ai-engine/agentEngine")

class Orchestrator{

constructor(){

this.engine=new AgentEngine()

}

runWorkflow(workflow){

console.log("Running workflow")

const results=[]

workflow.nodes.forEach(n=>{

results.push(this.engine.runAgent(n))

})

return results

}

}

module.exports=Orchestrator


