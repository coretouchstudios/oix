

'use client'
import {Handle,Position} from 'reactflow'

export default function VectorSearchNode({data}){

return(

<div style={{
background:"#1e293b",
padding:10,
borderRadius:8,
width:160
}}>

<b>VectorSearch</b>

<Handle type="target" position={Position.Left}/>
<Handle type="source" position={Position.Right}/>

</div>

)

}
