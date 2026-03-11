

const VectorStore=require("./vector-db/vectorStore")
const InferenceService=require("./gpu-inference/inferenceService")
const EventBus=require("./event-bus/eventBus")
const Scheduler=require("./scheduler/agentScheduler")

console.log("OIX Production Infrastructure Online")

const vector=new VectorStore()
const inference=new InferenceService()
const bus=new EventBus()
const scheduler=new Scheduler()

setInterval(()=>{

scheduler.run()

},2000)


