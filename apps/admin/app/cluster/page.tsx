"use client"
import {useEffect,useState} from "react"
import {getWorkers} from "../../services/clusterService"
export default function Cluster(){
const [workers,setWorkers]=useState<any[]>([])
useEffect(()=>{getWorkers().then(setWorkers)},[])
return(
<div>
<h1>OIX Cluster</h1>
{workers.map(w=>(
<div key={w.id}>
<p>{w.id}</p>
<p>Status: {w.status}</p>
<p>Jobs: {w.jobs}</p>
</div>
))}
</div>
)
}
