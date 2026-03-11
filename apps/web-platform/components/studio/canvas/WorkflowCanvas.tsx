
"use client"

import ReactFlow,{MiniMap,Controls,Background} from "reactflow"
import "reactflow/dist/style.css"
import {nodes,edges} from "../../../lib/workflow/graph"

export default function WorkflowCanvas(){

return(
<ReactFlow nodes={nodes} edges={edges} fitView>
<MiniMap/>
<Controls/>
<Background/>
</ReactFlow>
)

}

