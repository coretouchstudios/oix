const { QdrantClient } = require("@qdrant/js-client-rest")

class VectorStore {

constructor(){

this.client = new QdrantClient({
url: "http://localhost:6333",
checkCompatibility: false
})

}

async store(id, vector, payload){

await this.client.upsert("oix-memory", {
points: [
{
id,
vector,
payload
}
]
})

console.log("vector stored", id)

}

async search(vector){

const result = await this.client.search("oix-memory", {
vector,
limit:5
})

return result

}

}

module.exports = VectorStore