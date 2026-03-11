

class AIEconomy{

constructor(){

this.market=[]

}

tick(){

console.log("AI economy trading cycle")

}

register(agent){

this.market.push(agent)

}

}

module.exports=AIEconomy

