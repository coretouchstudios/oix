"use client"

export default function ClusterMap(){

const clusters=[
{id:"cluster-1",region:"us-east"},
{id:"cluster-2",region:"eu-west"}
]

return(
<div>
<h2>Cluster Map</h2>
{clusters.map(c=>(
<div key={c.id}>
{c.id} ({c.region})
</div>
))}
</div>
)

}
