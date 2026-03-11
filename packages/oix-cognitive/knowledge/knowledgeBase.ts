let knowledge:any[]=[]

export function storeKnowledge(entry:any){

knowledge.push(entry)

}

export function searchKnowledge(query:string){

return knowledge.filter(k=>JSON.stringify(k).includes(query))

}
