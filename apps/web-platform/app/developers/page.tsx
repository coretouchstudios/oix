"use client"

import { useState, useEffect } from "react"

export default function Developers(){

const [projects,setProjects]=useState([])
const [agent,setAgent]=useState("research-agent")

useEffect(()=>{

fetch("http://localhost:7000/v1/platform/projects/dev")
.then(r=>r.json())
.then(setProjects)
.catch(()=>{})

},[])

async function deploy(){

await fetch("http://localhost:7000/v1/platform/deploy",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
projectId:projects?.[0]?.id,
agent
})
})

alert("Agent deployed")

}

return(

<div style={{padding:40,fontFamily:"sans-serif"}}>

<h1>🚀 OIX Developer Dashboard</h1>

<h2>📦 Projects</h2>

<ul>
{projects.map(p=>(
<li key={p.id}>
{p.name} — {p.id}
</li>
))}
</ul>

<h2>🤖 Deploy Agent</h2>

<select
value={agent}
onChange={e=>setAgent(e.target.value)}
>

<option>research-agent</option>
<option>analysis-agent</option>
<option>generation-agent</option>

</select>

<button
onClick={deploy}
style={{marginLeft:10,padding:"8px 16px"}}
>
Deploy
</button>

<h2>📊 API Usage</h2>

<p>Usage analytics coming soon.</p>

<h2>💳 Billing</h2>

<p>Stripe integration coming soon.</p>

</div>

)

}
