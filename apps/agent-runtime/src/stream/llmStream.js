

const EventEmitter=require("eventemitter3")

class LLMStream extends EventEmitter{

start(prompt){

setTimeout(()=>{
this.emit("token","AI:")
this.emit("token","response")
this.emit("token",prompt)
this.emit("end")
},500)

}

}

module.exports=LLMStream

