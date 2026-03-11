
"use client"
import ReactFlow,{Background,Controls} from "reactflow"
import "reactflow/dist/style.css"

const nodes=[{id:"1",position:{x:0,y:0},data:{label:"Start"},type:"default"}]
const edges=[]

export default function WorkflowCanvas(){
return(
<div style={{flex:1}}>
<ReactFlow nodes={nodes} edges={edges}>
<Background/>
<Controls/>
</ReactFlow>
</div>
)
}

