export class VectorIndex{

store:any[]=[]

add(v:any){
this.store.push(v)
}

search(q:string){
return this.store
}

}
