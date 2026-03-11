const fs=require("fs")
const path=require("path")

const nodes=[

"Prompt","LLM","Agent","Memory","Tool",
"API","Webhook","Database","Logic",
"Router","Condition","Filter","Loop",

"Retriever","Embedder","VectorSearch",

"Email","Slack","Discord","SMS",

"Scraper","Crawler","Browser",

"GitHub","Docker","Kubernetes",

"Cache","Logger","Formatter","Parser",

"Trigger","Scheduler","Timer"

]

const base="packages/oix-nodes"

fs.mkdirSync(base,{recursive:true})

nodes.forEach(n=>{

const code=`

import {Handle,Position} from 'reactflow'

export default function ${n}Node(){

return(

<div style={{
background:"#1e293b",
padding:10,
borderRadius:8,
width:160
}}>

<b>${n}</b>

<Handle type="target" position={Position.Left}/>
<Handle type="source" position={Position.Right}/>

</div>

)

}
`

fs.writeFileSync(
path.join(base,n+"Node.tsx"),
code
)

})

console.log("Generated OIX node library")