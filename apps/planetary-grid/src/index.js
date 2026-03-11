

const ClusterNetwork=require("./clusters/clusterNetwork")
const KnowledgeGraph=require("./knowledge/globalGraph")
const ReasoningEngine=require("./reasoning/crossClusterReasoning")
const Economy=require("./economy/aiEconomy")

console.log("OIX Planetary Intelligence Grid Online")

const clusters=new ClusterNetwork()
const knowledge=new KnowledgeGraph()
const reasoning=new ReasoningEngine(clusters,knowledge)
const economy=new Economy()

setInterval(()=>{

reasoning.tick()
economy.tick()

},3000)


