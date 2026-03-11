
"use client"

import WorkflowCanvas from "../../components/studio/canvas/WorkflowCanvas"
import NodePalette from "../../components/studio/palette/NodePalette"
import AgentRunner from "../../components/studio/agents/AgentRunner"
import DebugPanel from "../../components/studio/debug/DebugPanel"

export default function Studio(){
return(
<div style={{display:"flex",height:"100vh"}}>

<div style={{width:260,borderRight:"1px solid #222"}}>
<NodePalette/>
</div>

<div style={{flex:1}}>
<WorkflowCanvas/>
</div>

<div style={{width:320,borderLeft:"1px solid #222"}}>
<AgentRunner/>
<DebugPanel/>
</div>

</div>
)
}

