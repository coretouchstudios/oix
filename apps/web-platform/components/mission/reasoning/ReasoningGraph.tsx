
"use client"

import ReactFlow,{Controls,Background} from "reactflow"
import "reactflow/dist/style.css"

const nodes=[
{id:"1",position:{x:0,y:0},data:{label:"Goal"}},
{id:"2",position:{x:200,y:100},data:{label:"Reasoning Step"}},
{id:"3",position:{x:400,y:0},data:{label:"Decision"}}
]

const edges=[
{id:"e1",source:"1",target:"2"},
{id:"e2",source:"2",target:"3"}
]

export default function ReasoningGraph(){

return(

<div>

<h3>AI Reasoning Graph</h3>

<ReactFlow nodes={nodes} edges={edges}>
<Controls/>
<Background/>
</ReactFlow>

</div>

)

}

