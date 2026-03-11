import { AgentController } from '../../backend/ai-agents-engine/agentController'

export class AgentOrchestrator {

 controller = new AgentController()

 async run(goal:string){

  return await this.controller.executeGoal(goal)

 }

}
