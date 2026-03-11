"use client"

import {Handle,Position} from "reactflow"

export default function PromptNode(){

return(

<div style={{
background:"#1e293b",
padding:10,
borderRadius:8
}}>

Prompt

<textarea placeholder="prompt"/>

<Handle type="target" position={Position.Left}/>
<Handle type="source" position={Position.Right}/>

</div>

)

}