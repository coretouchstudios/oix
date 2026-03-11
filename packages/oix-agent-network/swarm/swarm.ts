export class Swarm {

agents:any[]

constructor(agents:any[]){
this.agents=agents
}

async broadcast(task:any){

const results=[]

for(const a of this.agents){
results.push(await a.act(task))
}

return results

}

}
