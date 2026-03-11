'use client'

import { useEffect, useState } from "react"
import ForceGraph2D from "react-force-graph-2d"
import io from "socket.io-client"

export default function Swarm(){

const [graph,setGraph] = useState({
nodes:[{id:"root"}],
links:[]
})

useEffect(()=>{

const socket = io("http://localhost:7800")

socket.on("agentCreated",agent=>{

setGraph(g=>({

nodes:[...g.nodes,{id:agent.id}],
links:[
...g.links,
{
source:agent.parent,
target:agent.id
}
]

}))

})

},[])

return(

<div className="w-full h-screen bg-black">

<h1 className="text-white text-2xl p-4">
🧬 Self‑Evolving Agent Swarm
</h1>

<ForceGraph2D
graphData={graph}
nodeColor={()=>"orange"}
linkColor={()=>"cyan"}
backgroundColor="black"
/>

</div>

)

}