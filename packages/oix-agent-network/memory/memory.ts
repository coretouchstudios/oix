let memories:any={}

export function remember(agent:string,data:any){

if(!memories[agent]) memories[agent]=[]

memories[agent].push(data)

}

export function recall(agent:string){

return memories[agent] || []

}
