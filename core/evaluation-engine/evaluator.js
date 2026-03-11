const {runAgent}=require("../../backend/agents/agent")

async function evaluate(output,goal){

 const prompt=`
Evaluate if this result solves the goal.

Goal:
${goal}

Result:
${output}

Return score 1-10.
`

 const score=await runAgent(prompt)

 return score

}

module.exports={evaluate}