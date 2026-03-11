export function createMemory(content:string){

  return {

    id: Date.now().toString(),

    content,

    createdAt: Date.now()

  }

}
