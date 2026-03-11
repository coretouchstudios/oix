
"use client"

const items=[
{name:"Autonomous Research Agent"},
{name:"AI Content Factory"},
{name:"Trading Intelligence Bot"}
]

export default function EconomyMarket(){

return(

<div style={{padding:20}}>

<h3>AI Economy Marketplace</h3>

{items.map(i=>(
<div key={i.name}>
{i.name}
<button style={{marginLeft:10}}>Deploy</button>
</div>
))}

</div>

)

}

