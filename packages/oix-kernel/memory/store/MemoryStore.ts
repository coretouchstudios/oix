
export class MemoryStore{

memory:Map<string,any>=new Map()

set(key:string,val:any){
this.memory.set(key,val)
}

get(key:string){
return this.memory.get(key)
}

}

