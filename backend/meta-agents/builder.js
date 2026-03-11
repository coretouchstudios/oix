const {generateAgent} = require("../../core/agent-factory/generator")

async function buildAgents(agentList){

 const agents = []

 for(const a of agentList){

  const path = await generateAgent(a)

  agents.push(path)

 }

 return agents

}

module.exports={buildAgents}