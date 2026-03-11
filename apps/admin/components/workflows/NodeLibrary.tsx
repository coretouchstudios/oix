"use client"

export const nodes = [
  { type: "prompt", label: "Prompt Node" },
  { type: "llm", label: "LLM Node" },
  { type: "agent", label: "Agent Node" },
  { type: "rag", label: "RAG Pipeline" },
  { type: "scraper", label: "Web Scraper" },
  { type: "api", label: "API Request" }
]

export default function NodeLibrary(){

function dragStart(e:any,node:any){
  e.dataTransfer.setData("node",JSON.stringify(node))
}

return(

<div style={{
width:220,
background:"#020617",
padding:16,
height:"100%"
}}>

<h3>Node Library</h3>

{nodes.map(n=>(
<div
key={n.type}
draggable
onDragStart={(e)=>dragStart(e,n)}
style={{
background:"#1e293b",
padding:10,
marginBottom:8,
borderRadius:6,
cursor:"grab"
}}
>
{n.label}
</div>
))}

</div>

)

}