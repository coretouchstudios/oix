const {planAgents}=require("./planner")
const {buildAgents}=require("./builder")
const {evaluate}=require("../../core/evaluation-engine/evaluator")

async function runAutonomous(goal){

 const plan = await planAgents(goal)

 const agents = await buildAgents(plan)

 let output=""

 for(const agentPath of agents){

  const agent = require("../../"+agentPath)

  output = await agent.run(goal)

 }

 const score = await evaluate(output,goal)

 return {
  agents,
  output,
  score
 }

}

module.exports={runAutonomous}