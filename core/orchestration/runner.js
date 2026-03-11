

const {runAgent}=require("../../backend/ai-engine/agent")

async function runWorkflow(topic){

 const outline=await runAgent("create outline for "+topic)

 const report=await runAgent("write report for "+topic)

 return{
  outline,
  report
 }

}

module.exports={runWorkflow}

