"use client"
import {useEffect,useState} from "react"

export default function AgentMonitor(){

const [agents,setAgents]=useState<any[]>([])

useEffect(()=>{
setAgents([
{id:"agent-1",status:"running"},
{id:"agent-2",status:"idle"}
])
},[])

return(
<div>
<h2>Agent Monitor</h2>
{agents.map(a=>(
<div key={a.id}>
{a.id} - {a.status}
</div>
))}
</div>
)

}
