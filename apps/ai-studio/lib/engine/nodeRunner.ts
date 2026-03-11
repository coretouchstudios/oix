import {runAgent} from "../agents/agentRuntime"
import {callLLM} from "../llm/openai"

export async function runNode(node:any){

switch(node.data.label){

case "prompt":
return node.data.prompt

case "llm":
return await callLLM(node.data.prompt)

case "agent":
return await runAgent(node.data)

case "memory":
return "memory stored"

case "tool":
return "tool executed"

default:
return null

}

}