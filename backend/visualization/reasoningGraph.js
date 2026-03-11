const http = require("http")

console.log("🧠 Reasoning Graph Engine Online")

setInterval(()=>{

const nodes = Math.floor(Math.random()*20)+10
const edges = Math.floor(Math.random()*50)+20

console.log(`Reasoning graph updated → ${nodes} nodes / ${edges} edges`)

},3000)