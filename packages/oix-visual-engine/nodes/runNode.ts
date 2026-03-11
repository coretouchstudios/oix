export async function runNode(node:any,input:any){

switch(node.type){

case "prompt":
return node.data.prompt

case "llm":
return "LLM_RESPONSE:"+input

case "agent":
return "AGENT_RESULT:"+input

case "api":
return "API_RESULT:"+input

default:
return null

}

}
