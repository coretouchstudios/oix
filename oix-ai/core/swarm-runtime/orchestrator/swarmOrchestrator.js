import { SwarmEngine } from "../engine/swarmEngine.js"

export class SwarmOrchestrator {

  constructor() {
    this.engine = new SwarmEngine()
  }

  register(agent) {
    this.engine.register(agent)
  }

  async execute(goal) {
    return await this.engine.run(goal)
  }

}
