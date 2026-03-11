import {runLLM} from "./llm"
import {storeMemory} from "./vector-memory"

export async function runWorkflow(nodes:any[],edges:any[]){

const results:any={}

for(const node of nodes){

if(node.type==="prompt"){

results[node.id]=node.data.prompt

}

if(node.type==="llm"){

const prompt=Object.values(results).join("\n")

const output=await runLLM(prompt)

results[node.id]=output

}

if(node.type==="memory"){

storeMemory(results[Object.keys(results).pop()])

}

}

return results

}