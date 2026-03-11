"use client"
import {useEffect,useState} from "react"
import {getWorkflows} from "../../services/workflowService"
export default function Monitoring(){
const [workflows,setWorkflows]=useState<any[]>([])
useEffect(()=>{getWorkflows().then(setWorkflows)},[])
return(
<div>
<h1>Workflow Monitoring</h1>
{workflows.map(w=>(
<div key={w.id}>
<h3>{w.name}</h3>
<p>Status: {w.status}</p>
<p>Executions: {w.executions}</p>
</div>
))}
</div>
)
}
