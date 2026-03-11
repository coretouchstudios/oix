

const Evolution=require("../evolution/evolutionEngine")
const Learning=require("../learning/reinforcementEngine")
const Reasoning=require("../reasoning/reasoningMesh")

class SwarmManager{

constructor(){

this.agents=[]
this.evolution=new Evolution()
this.learning=new Learning()
this.reasoning=new Reasoning()

for(let i=0;i<10;i++){

this.agents.push({
id:"agent-"+i,
skill:"analysis"
})

}

}

tick(){

console.log("Swarm tick")

this.agents.forEach(a=>{
this.reasoning.process(a)
})

this.learning.update(this.agents)

if(Math.random()>0.7){

const newAgent=this.evolution.spawn()

this.agents.push(newAgent)

console.log("New agent created",newAgent.id)

}

}

}

module.exports=SwarmManager

