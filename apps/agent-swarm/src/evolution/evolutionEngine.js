

const {v4:uuid}=require("uuid")

class EvolutionEngine{

spawn(){

return{
id:"agent-"+uuid().slice(0,6),
skill:"generated"
}

}

}

module.exports=EvolutionEngine

