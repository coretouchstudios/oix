export function mutateAgent(agent:any){

agent.skills.push("adaptive-learning")

agent.version=(agent.version||1)+1

return agent

}
