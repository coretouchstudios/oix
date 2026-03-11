
import nodes from "../../../lib/nodes/nodeLibrary"

export default function NodePalette(){

return(
<div style={{padding:20}}>
<h3>Node Marketplace</h3>

{nodes.map(n=>(
<div key={n.id} style={{padding:8,marginBottom:8,background:"#1e293b"}}>
{n.name}
</div>
))}

</div>
)

}

