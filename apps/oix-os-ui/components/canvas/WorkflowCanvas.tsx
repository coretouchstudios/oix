"use client"
import {useState} from "react"

export default function WorkflowCanvas(){

const [nodes,setNodes]=useState<any[]>([])

function addNode(){
setNodes([...nodes,{id:Date.now(),x:100,y:100}])
}

return(
<div>
<h2>Workflow Canvas</h2>
<button onClick={addNode}>Add Node</button>
<div style={{border:"1px solid #444",height:400}}>
{nodes.map(n=>(
<div key={n.id} style={{position:"absolute",left:n.x,top:n.y}}>
⚙ Node
</div>
))}
</div>
</div>
)

}
