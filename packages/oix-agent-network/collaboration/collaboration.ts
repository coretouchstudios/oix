export async function collaborate(task:any,agents:any[]){

const responses=[]

for(const agent of agents){

responses.push(await agent.act(task))

}

return {
task,
responses
}

}
