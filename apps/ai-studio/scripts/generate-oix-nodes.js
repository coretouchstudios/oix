const fs=require("fs")
const path=require("path")

const nodes=[

"Prompt",
"LLM",
"Agent",
"Memory",
"Tool",
"API",
"Webhook",
"Database",
"Logic",
"VectorSearch",
"Retriever",
"Embedder",
"Chain",
"Router",
"Filter",
"Formatter",
"Logger",
"Cache",
"Trigger",
"Scheduler",
"Scraper",
"Email",
"Slack",
"Discord"

]

const base="components/nodes"

if(!fs.existsSync(base))
fs.mkdirSync(base,{recursive:true})

nodes.forEach(n=>{

const code=`

'use client'
import {Handle,Position} from 'reactflow'

export default function ${n}Node({data}){

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

console.log("OIX nodes generated")