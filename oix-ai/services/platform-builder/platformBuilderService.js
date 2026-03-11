import { generateAgent } from "../../core/self-build/generators/agentGenerator.js"
import { generateService } from "../../core/self-build/generators/serviceGenerator.js"
import { generateAPI } from "../../core/self-build/generators/apiGenerator.js"

export async function buildPlatform(){

  console.log("Generating Core Platform Components")

  generateAgent("research")
  generateAgent("devops")

  generateService("analytics")
  generateService("notifications")

  generateAPI("platform")

  return {
    status:"platform expanded"
  }

}
