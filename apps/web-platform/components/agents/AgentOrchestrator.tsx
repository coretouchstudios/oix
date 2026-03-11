
"use client"
import {useState} from "react"

export default function AgentOrchestrator(){

const [agents,setAgents]=useState(["ResearchAgent","WriterAgent"])

return(
<div>
<h2>Agents</h2>
{agents.map(a=>(<div key={a}>{a}</div>))}
</div>
)
}

