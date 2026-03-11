
export class KnowledgeEvolution{

knowledge:any[]=[]

update(k:any){
this.knowledge.push(k)
}

evolve(){
return this.knowledge.length
}

}

