"use client"

export default function NodeInspector({node,update}:any){

if(!node) return null

return(

<div style={{
position:"absolute",
right:0,
top:0,
width:320,
height:"100%",
background:"#0f172a",
padding:20
}}>

<h3>{node.data.label}</h3>

<textarea
placeholder="Prompt"
value={node.data.prompt || ""}
onChange={(e)=>update(node.id,{prompt:e.target.value})}
/>

<label>Temperature</label>

<input
type="range"
min="0"
max="1"
step="0.1"
/>

</div>

)

}