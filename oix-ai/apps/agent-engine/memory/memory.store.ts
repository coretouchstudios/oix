const memory:any = {}

export function saveMemory(agentId:string,data:any){

 memory[agentId] = data

}

export function getMemory(agentId:string){

 return memory[agentId]

}
