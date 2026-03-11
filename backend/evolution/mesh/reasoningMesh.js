async function collaborate(task){

const {runAgent}=await import("../../agents/runtime/agentRunner.js")

const agents=["analysis","research","generation"]

let results=[]

for(const agent of agents){

const result=await runAgent(task+" "+agent)

results.push(result)

}

return {
task,
collaboration:results
}

}

module.exports={collaborate}