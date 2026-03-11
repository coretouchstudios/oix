import { LLMProvider } from "../providers/llmProvider"
import { AIRequest } from "../types/aiRequest"

export class ReasoningEngine {

 constructor(private provider:LLMProvider){}

 async run(prompt:string){

  const request:AIRequest = { prompt }

  return this.provider.generate(request)

 }

}
