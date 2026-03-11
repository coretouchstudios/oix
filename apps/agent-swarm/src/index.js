

const Swarm=require("./swarm/swarmManager")

console.log("OIX Autonomous Agent Swarm Online")

const swarm=new Swarm()

setInterval(()=>{
swarm.tick()
},2000)


