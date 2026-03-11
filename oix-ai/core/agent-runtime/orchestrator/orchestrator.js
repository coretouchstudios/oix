import { AgentEngine } from "../engine/agentEngine.js"

export class Orchestrator {

  constructor() {
    this.engine = new AgentEngine()
  }

  register(agent) {
    this.engine.register(agent)
  }

  async run(task) {
    return await this.engine.run(task)
  }

}
