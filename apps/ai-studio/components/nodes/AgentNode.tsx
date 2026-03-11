"use client"

import {Handle,Position} from "reactflow"

export default function AgentNode(){

return(

<div style={{
background:"#1e3a8a",
padding:10,
borderRadius:8
}}>

Agent

<Handle type="target" position={Position.Left}/>
<Handle type="source" position={Position.Right}/>

</div>

)

}