
export default function NodePalette(){
const nodes=["LLM","RAG","HTTP","Scraper","Agent","Memory"]
return(
<div style={{padding:20}}>
<h3>Node Library</h3>
{nodes.map(n=>(<div key={n} style={{marginBottom:10,padding:8,background:"#1e293b"}}>{n}</div>))}
</div>
)
}

