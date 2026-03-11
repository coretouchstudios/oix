

const {Kafka}=require("kafkajs")

class EventBus{

constructor(){

this.kafka=new Kafka({
clientId:"oix",
brokers:["localhost:9092"]
})

}

async publish(topic,message){

console.log("publishing event",topic)

}

}

module.exports=EventBus


