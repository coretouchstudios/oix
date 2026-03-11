
const {agentQueue}=require("../cluster/queue")

async function startAgent(task){

await agentQueue.add("run-agent",{task})

return {status:"queued"}

}

module.exports={startAgent}

