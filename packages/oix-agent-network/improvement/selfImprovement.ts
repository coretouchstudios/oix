export function selfImprove(agent:any,feedback:any){

agent.memory.feedback=feedback

return {
agent:agent.id,
improved:true
}

}
