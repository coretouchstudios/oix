import {embed} from "../vector/embedding"
import {VectorStore} from "../vector/vectorStore"

const store=new VectorStore()

export async function ingestDocument(id:string,text:string){

const vector=await embed(text)

store.add(id,vector,text)

}

export async function retrieveContext(query:string){

const vector=await embed(query)

return store.search(vector)

}
