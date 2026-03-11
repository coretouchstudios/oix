const memory:any[]=[]

export function storeMemory(text:string){

memory.push(text)

}

export function searchMemory(query:string){

return memory.filter(m=>m.includes(query))

}