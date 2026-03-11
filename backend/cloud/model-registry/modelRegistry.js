

const {v4:uuid}=require("uuid")

class ModelRegistry{

constructor(){

this.models=[]

}

register(model){

const m={
id:uuid(),
name:model.name,
version:model.version
}

this.models.push(m)

console.log("model registered",m)

return m

}

list(){

return this.models

}

}

module.exports=ModelRegistry


