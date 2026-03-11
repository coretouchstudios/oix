console.log("🌐 Global Compute Network Online")

const nodes = [
"us-east-gpu",
"eu-west-gpu",
"asia-ai-node",
"research-node",
"inference-node"
]

setInterval(()=>{

const node = nodes[Math.floor(Math.random()*nodes.length)]

console.log(`⚡ Task routed to node: ${node}`)

},2500)