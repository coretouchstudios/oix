import { MockProvider } from "../providers/mockProvider"
import { ReasoningEngine } from "../reasoning/reasoningEngine"
import { PromptBuilder } from "../prompt/promptBuilder"

export class AIEngine {

 provider = new MockProvider()

 reasoning = new ReasoningEngine(this.provider)

 async ask(system:string,user:string){

  const prompt = PromptBuilder.build(system,user)

  return this.reasoning.run(prompt)

 }

}
