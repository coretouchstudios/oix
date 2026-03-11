"use client"

import {Handle,Position} from "reactflow"

export default function MemoryNode(){

return(

<div style={{
background:"#065f46",
padding:10,
borderRadius:8
}}>

Memory

<Handle type="target" position={Position.Left}/>
<Handle type="source" position={Position.Right}/>

</div>

)

}