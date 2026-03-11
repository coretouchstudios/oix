import { LLMProvider } from "./llmProvider"
import { AIRequest } from "../types/aiRequest"
import { AIResponse } from "../types/aiResponse"

export class MockProvider implements LLMProvider {

 async generate(request: AIRequest): Promise<AIResponse> {

  return {
   text: "Mock AI response for: " + request.prompt
  }

 }

}
