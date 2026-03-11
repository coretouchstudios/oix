
"use client"

import {useEffect,useState} from "react"

export default function AgentMonitor(){

const [agents,setAgents]=useState([])

useEffect(()=>{

setAgents([
{name:"Research Agent",status:"running"},
{name:"Writer Agent",status:"idle"},
{name:"Analysis Agent",status:"running"}
])

},[])

return(

<div style={{background:"#111",padding:20}}>

<h3>Agent Activity</h3>

{agents.map(a=>(
<div key={a.name}>{a.name} - {a.status}</div>
))}

</div>

)

}

