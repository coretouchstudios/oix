export class MemorySystem {

 memory:any[] = []

 store(data:any){
  this.memory.push(data)
 }

 recall(){
  return this.memory
 }

}
