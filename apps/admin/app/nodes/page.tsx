"use client"

import NodeLibrary from "../../components/workflows/NodeLibrary"
import WorkflowCanvas from "../../components/workflows/WorkflowCanvas"

export default function Nodes(){

return(

<div style={{display:"flex",height:"100vh"}}>

<NodeLibrary/>

<WorkflowCanvas/>

</div>

)

}