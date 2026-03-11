"use client"

import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background
} from "reactflow"

import "reactflow/dist/style.css"

export default function Canvas({selected,setSelected}:any){

  const [nodes,setNodes,onNodesChange] = useNodesState([])
  const [edges,setEdges,onEdgesChange] = useEdgesState([])

  const onConnect = (params:any)=>setEdges((eds)=>addEdge(params,eds))

  const onDrop = (event:any)=>{
    event.preventDefault()

    const type = event.dataTransfer.getData("application/reactflow")

    const newNode = {
      id: crypto.randomUUID(),
      type:"default",
      position:{x:event.clientX-200,y:event.clientY-100},
      data:{label:type}
    }

    setNodes((nds)=>nds.concat(newNode))
  }

  const onDragOver=(event:any)=>{
    event.preventDefault()
    event.dataTransfer.dropEffect="move"
  }

  return(
    <div style={{height:"100%"}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e,n)=>setSelected(n)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Controls/>
        <Background/>
      </ReactFlow>
    </div>
  )
}