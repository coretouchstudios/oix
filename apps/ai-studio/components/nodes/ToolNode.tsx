"use client"

import {Handle,Position} from "reactflow"

export default function ToolNode(){

return(

<div style={{
background:"#92400e",
padding:10,
borderRadius:8
}}>

Tool

<Handle type="target" position={Position.Left}/>
<Handle type="source" position={Position.Right}/>

</div>

)

}