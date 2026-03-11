"use client"
import {useEffect,useState} from 'react'

export default function AgentMonitor(){

const [agents,setAgents]=useState<any[]>([])

useEffect(()=>{
setAgents([
{name:'ResearchAgent',status:'running'},
{name:'CodingAgent',status:'idle'},
{name:'AutomationAgent',status:'running'}
])
},[])

return(
<div>
{agents.map((a,i)=>(
<div key={i} className='card'>
<b>{a.name}</b> — {a.status}
</div>
))}
</div>
)
}
