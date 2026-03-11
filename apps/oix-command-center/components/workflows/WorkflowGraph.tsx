"use client"
import {useState,useEffect} from "react"

export default function WorkflowGraph(){

const [runs,setRuns]=useState<any[]>([])

useEffect(()=>{
setRuns([
{id:"wf1",status:"running",progress:70},
{id:"wf2",status:"success",progress:100}
])
},[])

return(
<div>
<h2>Workflow Execution</h2>
{runs.map(r=>(
<div key={r.id}>
{r.id} — {r.status} — {r.progress}%
</div>
))}
</div>
)
}
