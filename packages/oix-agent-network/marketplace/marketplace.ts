let marketplace:any[]=[]

export function publishAgent(agent:any){

marketplace.push(agent)

return {
status:"published",
agent
}

}

export function listAgents(){

return marketplace

}
