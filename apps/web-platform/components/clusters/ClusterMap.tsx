
"use client"

export default function ClusterMap(){

const clusters=[
{name:"US Cluster",region:"USA"},
{name:"EU Cluster",region:"Europe"},
{name:"AF Cluster",region:"Africa"}
]

return(

<div style={{background:"#111",padding:20}}>

<h3>AI Cluster Network</h3>

{clusters.map(c=>(
<div key={c.name}>{c.name} - {c.region}</div>
))}

</div>

)

}

