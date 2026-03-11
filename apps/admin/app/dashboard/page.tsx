"use client"
import {useEffect,useState} from "react"
import {getSystemHealth} from "../../services/monitoringService"
export default function Dashboard(){
const [health,setHealth]=useState<any>()
useEffect(()=>{getSystemHealth().then(setHealth)},[])
if(!health) return null
return(
<div>
<h1>System Health</h1>
<p>CPU: {health.cpu}%</p>
<p>Memory: {health.memory}%</p>
<p>Running Workflows: {health.workflowsRunning}</p>
<p>Active Agents: {health.agentsActive}</p>
</div>
)
}
