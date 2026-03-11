import { runCognitivePipeline } from "./cognitive.engine"

export function processIdea(idea:string){

 const result = runCognitivePipeline(idea)

 return result

}
