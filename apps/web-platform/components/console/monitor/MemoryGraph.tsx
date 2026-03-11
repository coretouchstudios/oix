"use client"

import dynamic from "next/dynamic"

const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d"),
  { ssr: false }
)

export default function MemoryGraph(){

const data={
nodes:[
{id:"agent"},
{id:"task"},
{id:"memory"}
],
links:[
{source:"agent",target:"task"},
{source:"task",target:"memory"}
]
}

return(

<div>

<h2>Agent Memory Graph</h2>

<ForceGraph2D
graphData={data}
height={300}
/>

</div>

)

}