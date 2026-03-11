const {runAgent} = require("../../backend/agents/agent")
const fs = require("fs")

async function generateAgent(task){

 const prompt = `
Create a Node.js AI agent module.

Task: ${task}

Return:
name
description
javascript implementation
`

 const spec = await runAgent(prompt)

 const file = `
const {runAgent} = require("../agents/agent")

async function run(input){

 const result = await runAgent("${task} " + input)

 return result

}

module.exports = {run}
`

 const path = `marketplace/generated-agents/${Date.now()}.js`

 fs.writeFileSync(path,file)

 return path

}

module.exports={generateAgent}