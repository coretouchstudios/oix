"use client"
import {useEffect,useState} from "react"

export default function AgentActivityMap(){

const [agents,setAgents]=useState<any[]>([])

useEffect(()=>{
setAgents([
{id:"agent-1",region:"us-east",status:"running"},
{id:"agent-2",region:"eu-west",status:"idle"},
{id:"agent-3",region:"asia",status:"working"}
])
},[])

return(
<div>
<h2>Live Agent Activity</h2>
{agents.map(a=>(
<div key={a.id}>
{a.id} — {a.region} — {a.status}
</div>
))}
</div>
)
}
