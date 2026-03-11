console.log("🌐 Global Compute Network Online")

const nodes = [
"us-east",
"eu-west",
"asia",
"africa",
"edge-node-1",
"edge-node-2"
]

setInterval(()=>{

const active = nodes[Math.floor(Math.random()*nodes.length)]

console.log(`Compute node active → ${active}`)

},4000)