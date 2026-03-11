import {QdrantClient} from "@qdrant/js-client-rest"

const client=new QdrantClient({
url:"http://localhost:6333"
})

export async function searchVector(query:string){

const result=await client.search("oix_docs",{

vector:[0.1,0.2,0.3],
limit:5

})

return result.map(r=>r.payload.text)

}