"use client"
import {useEffect,useState} from "react"

export default function Dashboard(){

const [stats,setStats]=useState<any>()

useEffect(()=>{
setStats({
agents:12,
workflows:24,
clusters:3
})
},[])

if(!stats) return null

return(
<div>
<h1>OIX AI Operating System</h1>
<p>Agents: {stats.agents}</p>
<p>Workflows: {stats.workflows}</p>
<p>Clusters: {stats.clusters}</p>
</div>
)

}
