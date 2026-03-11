"use client"

export default function Palette({addNode}:any){

const nodes=[
"prompt",
"llm",
"agent",
"memory",
"tool"
]

return(

<div style={{
position:"absolute",
left:10,
top:80,
background:"#020617",
padding:10,
color:"white",
zIndex:10
}}>

{nodes.map(n=>(

<button
key={n}
onClick={()=>addNode(n)}
style={{
display:"block",
marginBottom:5
}}
>

{n}

</button>

))}

</div>

)

}