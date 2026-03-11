import { AIRequest } from "../types/aiRequest"
import { AIResponse } from "../types/aiResponse"

export interface LLMProvider {

  generate(request: AIRequest): Promise<AIResponse>

}
