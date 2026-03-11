export class AgentMemory{

memory:any[]=[]

add(entry:any){
this.memory.push(entry)
}

search(query:string){
return this.memory.filter(m=>JSON.stringify(m).includes(query))
}

}
