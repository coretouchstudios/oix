

const Orchestrator=require("./orchestrator/orchestrator")
const Cluster=require("./cluster/clusterManager")

console.log("OIX Distributed Agent Runtime")

const cluster=new Cluster()
const orchestrator=new Orchestrator(cluster)

setInterval(()=>{
orchestrator.tick()
},2000)


