
"use client"

import {useEffect,useState} from "react"

export default function AgentSwarm(){

const [agents,setAgents]=useState<any[]>([])

useEffect(()=>{

setAgents([
{name:"Research Agent",cluster:"US"},
{name:"Writer Agent",cluster:"EU"},
{name:"Analysis Agent",cluster:"Asia"}
])

},[])

return(

<div style={{padding:20}}>

<h3>Global Agent Swarm</h3>

{agents.map(a=>(
<div key={a.name}>
{a.name} @ {a.cluster}
</div>
))}

</div>

)

}

