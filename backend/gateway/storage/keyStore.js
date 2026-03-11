

const {v4:uuid}=require("uuid")

class KeyStore{

constructor(){

this.keys=[]

}

create(){

const key="oix-"+uuid()

this.keys.push(key)

return key

}

validate(key){

return this.keys.includes(key)

}

}

module.exports=KeyStore


