#!/usr/bin/env node

const { Command } = require("commander")
const { spawn } = require("child_process")
const chalk = require("chalk").default

const program = new Command()

function run(commands){

const child = spawn(
  "npx",
  ["concurrently", ...commands],
  {
    stdio:"inherit",
    shell:true
  }
)

child.on("error",err=>{
  console.error(err)
})

}

program
.command("start")
.description("Start OIX platform")
.action(()=>{

console.log(chalk.green("🚀 Booting OIX AI Platform"))

run([
'"node backend/gateway/server.js"',
'"npm run dev --workspace=oix-visual-studio"'
])

})


program
.command("demo")
.description("Launch OIX demo environment")
.action(()=>{

console.log(chalk.cyan("🌍 Launching OIX Demo"))

run([
'"node backend/gateway/server.js"',
'"node backend/agents/demoAgents.js"',
'"node backend/workflows/demoWorkflow.js"',
'"node backend/compute/demoNodes.js"',
'"npm run dev --workspace=oix-visual-studio"'
])

})


program
.command("pitch")
.description("Launch investor demo")
.action(()=>{

console.log(chalk.magenta("🎤 Launching OIX Investor Demo"))

run([
'"node backend/gateway/server.js"',
'"node backend/agents/demoAgents.js"',
'"node backend/workflows/demoWorkflow.js"',
'"node backend/compute/demoNodes.js"',
'"node backend/visualization/reasoningGraph.js"',
'"node backend/visualization/computeMap.js"',
'"npm run dev --workspace=oix-visual-studio"'
])

})


program
.command("universe")
.description("Launch 3D AI infrastructure control center")
.action(()=>{

console.log(chalk.blue("🌌 Launching OIX Universe"))

run([
'"node backend/gateway/server.js"',
'"node backend/agents/demoAgents.js"',
'"node backend/agents/evolvingSwarm.js"',
'"node backend/agents/startupGenerator.js"',
'"node backend/workflows/demoWorkflow.js"',
'"node backend/compute/demoNodes.js"',
'"node backend/visualization/reasoningGraph.js"',
'"node backend/visualization/computeMap.js"',
'"node backend/visualization/tokenStream.js"',
'"npm run dev --workspace=oix-visual-studio"'
])
})

program.parse(process.argv)