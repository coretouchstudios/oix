
"use client"

import {useEffect,useState} from "react"

export default function WorkflowTrace(){

const [events,setEvents]=useState<any[]>([])

useEffect(()=>{

setEvents([
{time:"10:00",event:"Workflow started"},
{time:"10:01",event:"Agent executed"},
{time:"10:02",event:"LLM response"}
])

},[])

return(

<div style={{padding:20}}>

<h3>Workflow Execution Trace</h3>

{events.map((e,i)=>(
<div key={i}>{e.time} - {e.event}</div>
))}

</div>

)

}

