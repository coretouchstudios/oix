
"use client"

export default function AgentRunner(){

async function run(){
await fetch("/api/workflow/run",{method:"POST"})
alert("Workflow started")
}

return(
<div style={{padding:20}}>
<h3>Agent Runner</h3>
<button onClick={run}>Run Workflow</button>
</div>
)

}

