'use client'

import { useState } from "react"
import ForceGraph2D from "react-force-graph-2d"

export default function Replay(){

const [step,setStep] = useState(0)
const [history,setHistory] = useState([])

const graph = history[step]
? {
nodes: history[step].map(a=>({id:a.id})),
links: history[step]
.filter(a=>a.parent)
.map(a=>({
source:a.parent,
target:a.id
}))
}
: {nodes:[],links:[]}

return(

<div className="w-full h-screen bg-black text-white">

<h1 className="p-4 text-2xl">
⏳ AI Swarm Time‑Travel Replay
</h1>

<div className="p-4">

<input
type="range"
min="0"
max={history.length-1}
value={step}
onChange={e=>setStep(Number(e.target.value))}
className="w-full"
/>

</div>

<ForceGraph2D
graphData={graph}
nodeColor={()=>"orange"}
linkColor={()=>"cyan"}
backgroundColor="black"
/>

</div>

)

}