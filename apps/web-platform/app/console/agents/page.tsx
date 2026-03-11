

"use client"

import {useState} from "react"
import Layout from "@/components/console/layout/DashboardLayout"

export default function Agents(){

const[input,setInput]=useState("")

function run(){

alert("Agent executed: "+input)

}

return(

<Layout>

<h2>Agent Runner</h2>

<input
value={input}
onChange={e=>setInput(e.target.value)}
placeholder="agent task"
/>

<button onClick={run}>
Run Agent
</button>

</Layout>

)

}


