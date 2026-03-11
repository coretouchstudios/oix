
"use client"

import {useEffect,useState} from "react"

export default function AgentSwarm(){

const [agents,setAgents]=useState<any[]>([])

useEffect(()=>{

setAgents([
{name:"Research Agent",tasks:12},
{name:"Writer Agent",tasks:4},
{name:"Analysis Agent",tasks:7}
])

},[])

return(

<div style={{padding:20}}>

<h3>Agent Swarm</h3>

{agents.map(a=>(
<div key={a.name}>
{a.name} : {a.tasks} tasks
</div>
))}

</div>

)

}

