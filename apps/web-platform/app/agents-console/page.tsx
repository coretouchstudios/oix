
"use client"

export default function AgentConsole(){

async function startAgent(){

await fetch("/api/agents/start",{method:"POST"})

alert("Agent Started")

}

return(

<div style={{padding:30}}>

<h1>Autonomous Agent Console</h1>

<button onClick={startAgent}>Launch Agent</button>

</div>

)

}

