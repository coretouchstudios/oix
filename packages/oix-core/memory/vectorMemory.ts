let memory:any[]=[]

export function addMemory(vector:number[],text:string){

memory.push({vector,text})

}

export function searchMemory(vector:number[]){

return memory.slice(0,5).map(m=>m.text)

}
