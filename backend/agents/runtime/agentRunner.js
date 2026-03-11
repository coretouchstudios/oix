const {learn}=require("../../evolution/learning/reinforcement")
const {plan}=require("./planner")
const {execute}=require("./toolExecutor")

async function runAgent(task){

const steps=plan(task)

let results=[]

for(const step of steps){

const result=await execute(step)

results.push(result)

}

return {
task,
results
}

}

module.exports={runAgent}

await learn(task,results)