
"use client"

import ClusterMap3D from "../../components/mission/map/ClusterMap3D"
import AgentSwarm from "../../components/mission/swarm/AgentSwarm"
import ReasoningGraph from "../../components/mission/reasoning/ReasoningGraph"
import WorkflowTrace from "../../components/mission/workflows/WorkflowTrace"

export default function Mission(){

return(

<div style={{height:"100vh",display:"grid",gridTemplateRows:"60% 40%"}}>

<div style={{display:"grid",gridTemplateColumns:"60% 40%"}}>

<ClusterMap3D/>
<AgentSwarm/>

</div>

<div style={{display:"grid",gridTemplateColumns:"50% 50%"}}>

<ReasoningGraph/>
<WorkflowTrace/>

</div>

</div>

)

}

