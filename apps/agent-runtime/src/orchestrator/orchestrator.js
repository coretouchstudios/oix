

const AgentEngine=require("../engine/agentEngine")

class Orchestrator{

constructor(cluster){

this.cluster=cluster
this.engine=new AgentEngine()

}

tick(){

console.log("Orchestrator tick")

const tasks=[
{agent:"research",goal:"collect data"},
{agent:"writer",goal:"generate report"}
]

tasks.forEach(t=>{
this.engine.execute(t)
})

}

}

module.exports=Orchestrator

