export class SwarmEngine {

  constructor() {
    this.agents = []
  }

  register(agent) {
    this.agents.push(agent)
  }

  async run(goal) {

    let results = []

    for (const agent of this.agents) {

      const result = await agent.execute(goal)

      results.push({
        agent: agent.name,
        output: result
      })

    }

    return results
  }

}
