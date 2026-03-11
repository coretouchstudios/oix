
"use client"

import AgentMonitor from "../../components/monitoring/AgentMonitor"
import WorkflowGraph from "../../components/dashboard/WorkflowGraph"
import ClusterMap from "../../components/clusters/ClusterMap"

export default function Dashboard(){

return(
<div style={{padding:30}}>

<h1>OIX AI Operating System</h1>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>

<AgentMonitor/>
<WorkflowGraph/>

</div>

<div style={{marginTop:30}}>
<ClusterMap/>
</div>

</div>
)

}

