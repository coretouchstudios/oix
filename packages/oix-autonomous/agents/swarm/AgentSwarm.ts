
export class AgentSwarm{

agents:any[]=[]

add(agent:any){
this.agents.push(agent)
}

async run(input:any){
return Promise.all(this.agents.map(a=>a.run(input)))
}

}

