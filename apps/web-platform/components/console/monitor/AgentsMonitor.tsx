
"use client"

import {useEffect,useState} from "react"
import axios from "axios"

export default function AgentsMonitor(){

const [agents,setAgents]=useState([])

useEffect(()=>{

async function load(){
const res=await axios.get("http://localhost:7000/v1/agents")
setAgents(res.data||[])
}

load()

},[])

return(

<div>
<h2>Running Agents</h2>

<ul>
{agents.map((a,i)=>(
<li key={i}>{JSON.stringify(a)}</li>
))}
</ul>

</div>

)

}

