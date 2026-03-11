export class AgentEngine {

  constructor() {
    this.agents = []
  }

  register(agent) {
    this.agents.push(agent)
  }

  async run(task) {

    for (const agent of this.agents) {

      if (agent.canHandle(task)) {
        return await agent.execute(task)
      }

    }

    return "No agent available"
  }

}
