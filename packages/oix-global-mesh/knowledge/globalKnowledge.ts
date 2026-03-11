let sharedKnowledge:any[]=[]

export function publishKnowledge(data:any){

sharedKnowledge.push({
time:Date.now(),
data
})

}

export function getKnowledge(){

return sharedKnowledge

}
