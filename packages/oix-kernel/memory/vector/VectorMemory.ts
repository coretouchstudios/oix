
export class VectorMemory{

store:any[]=[]

add(vector:number[],data:any){
this.store.push({vector,data})
}

search(vector:number[]){
return this.store.slice(0,5)
}

}

