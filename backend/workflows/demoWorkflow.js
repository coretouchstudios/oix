console.log("🔁 Workflow Engine Running")

const steps = [
"Research Node",
"Reasoning Node",
"Planning Node",
"Generation Node",
"Output Node"
]

let i=0

setInterval(()=>{

console.log(`Workflow Step → ${steps[i]}`)

i++
if(i>=steps.length) i=0

},2000)