import {retrieveContext} from "../rag/retriever"
import {generate} from "../llm/generate"
import {learnFromExecution} from "../learning/learningLoop"

export async function runRAG(goal:string){

const context=await retrieveContext(goal)

const prompt=goal + JSON.stringify(context)

const result=await generate(prompt)

learnFromExecution(goal,result)

return result

}
