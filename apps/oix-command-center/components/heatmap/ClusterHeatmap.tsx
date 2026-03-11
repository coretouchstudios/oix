"use client"
import {useEffect,useState} from "react"

export default function ClusterHeatmap(){

const [clusters,setClusters]=useState<any[]>([])

useEffect(()=>{
setClusters([
{id:"cluster-1",cpu:34,mem:40},
{id:"cluster-2",cpu:70,mem:65},
{id:"cluster-3",cpu:15,mem:22}
])
},[])

return(
<div>
<h2>Cluster Load Heatmap</h2>
{clusters.map(c=>(
<div key={c.id}>
{c.id} — CPU:{c.cpu}% MEM:{c.mem}%
</div>
))}
</div>
)
}
