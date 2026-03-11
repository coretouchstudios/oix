let knowledge:any[]=[]

export function storeKnowledge(data:any){

knowledge.push({
time:Date.now(),
data
})

}

export function queryKnowledge(){

return knowledge

}
