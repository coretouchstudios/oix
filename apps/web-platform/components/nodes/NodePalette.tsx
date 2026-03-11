
export default function NodePalette(){
const nodes=["LLM","RAG","Scraper","Agent","API","Condition"]

return(
<div style={{width:220,borderRight:"1px solid #ddd",padding:10}}>
<h3>Nodes</h3>
{nodes.map(n=>(<div key={n} style={{padding:6,border:"1px solid #ccc",marginBottom:6}}>{n}</div>))}
</div>
)
}

