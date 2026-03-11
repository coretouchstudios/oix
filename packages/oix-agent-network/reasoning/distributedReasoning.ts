export async function distributedReason(task:any,agents:any[]){

const outputs=[]

for(const agent of agents){

const res=await agent.act(task)

outputs.push(res)

}

return {
task,
results:outputs
}

}
