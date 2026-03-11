const {runAgent}=require("../agents/agent")

async function planAgents(goal){

 const prompt = `
You are an AI system architect.

Break this goal into agents.

Goal:
${goal}

Return JSON list of agents.
`

 const plan = await runAgent(prompt)

 return plan

}

module.exports={planAgents}