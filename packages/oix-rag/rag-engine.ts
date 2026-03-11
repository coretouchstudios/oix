import {searchVector} from "./vector-db"
import {runLLM} from "../oix-engine/llm"

export async function runRAG(query:string){

const docs=await searchVector(query)

const context=docs.join("\n")

const prompt=`
Use this knowledge:

${context}

Question:
${query}
`

return runLLM(prompt)

}