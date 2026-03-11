

'use client'
import {Handle,Position} from 'reactflow'

export default function WebhookNode({data}){

return(

<div style={{
background:"#1e293b",
padding:10,
borderRadius:8,
width:160
}}>

<b>Webhook</b>

<Handle type="target" position={Position.Left}/>
<Handle type="source" position={Position.Right}/>

</div>

)

}
