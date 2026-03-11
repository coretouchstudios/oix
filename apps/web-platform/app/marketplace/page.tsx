
"use client"

const items=[
{name:"Research Agent"},
{name:"SEO Workflow"},
{name:"Content Generator"}
]

export default function Marketplace(){

return(

<div style={{padding:30}}>

<h1>AI Marketplace</h1>

{items.map(i=>(
<div key={i.name} style={{marginBottom:10}}>

{i.name}

<button style={{marginLeft:10}}>Install</button>

</div>
))}

</div>

)

}

