

class MetaManager{

constructor(){

this.agents=[]

}

register(agent){

this.agents.push(agent)

}

monitor(){

console.log("Monitoring",this.agents.length,"agents")

}

}

module.exports=MetaManager


