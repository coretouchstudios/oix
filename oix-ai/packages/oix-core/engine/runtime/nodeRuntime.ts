import {WorkflowState} from "../executor/stateMachine"

const state=new WorkflowState()

export async function runNode(node:any){

switch(node.data.label){

case "prompt":
return node.data.prompt

case "llm":
return "llm-response"

case "agent":
return "agent-result"

case "tool":
return "tool-result"

default:
return null

}

}
