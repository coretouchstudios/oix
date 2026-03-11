

"use client"

import {useState} from "react"
import Layout from "@/components/console/layout/DashboardLayout"

export default function Workflows(){

const[input,setInput]=useState("")

function run(){

alert("Workflow executed: "+input)

}

return(

<Layout>

<h2>Workflow Runner</h2>

<input
value={input}
onChange={e=>setInput(e.target.value)}
placeholder="workflow name"
/>

<button onClick={run}>
Run Workflow
</button>

</Layout>

)

}


