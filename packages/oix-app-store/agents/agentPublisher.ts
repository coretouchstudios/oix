export function publishAgent(agent:any){
return {
id:"agent-"+Date.now(),
type:"agent",
...agent
}
}
