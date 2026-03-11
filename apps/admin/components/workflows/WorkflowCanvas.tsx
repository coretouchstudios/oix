"use client"

import ReactFlow,{addEdge,useNodesState,useEdgesState} from "reactflow"
import "reactflow/dist/style.css"

export default function WorkflowCanvas(){

const [nodes,setNodes,onNodesChange]=useNodesState([])
const [edges,setEdges,onEdgesChange]=useEdgesState([])

function onDrop(event:any){

event.preventDefault()

const data=JSON.parse(event.dataTransfer.getData("node"))

const newNode={
id:Date.now().toString(),
position:{x:Math.random()*400,y:Math.random()*400},
data:{label:data.label},
type:"default"
}

setNodes(nds=>nds.concat(newNode))

}

return(

<div
style={{flex:1,height:"100vh"}}
onDrop={onDrop}
onDragOver={(e)=>e.preventDefault()}
>

<ReactFlow
nodes={nodes}
edges={edges}
onNodesChange={onNodesChange}
onEdgesChange={onEdgesChange}
/>

</div>

)

}