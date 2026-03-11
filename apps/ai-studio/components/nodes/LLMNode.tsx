"use client"

import {Handle,Position} from "reactflow"

export default function LLMNode(){

return(

<div style={{
background:"#312e81",
padding:10,
borderRadius:8
}}>

LLM

<Handle type="target" position={Position.Left}/>
<Handle type="source" position={Position.Right}/>

</div>

)

}