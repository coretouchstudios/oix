export class StartupFactory {

  constructor(swarm) {
    this.swarm = swarm
  }

  async createStartup(idea) {

    console.log("Starting Autonomous Startup Creation")

    const research = await this.swarm.execute("research " + idea)

    const product = await this.swarm.execute("design product for " + idea)

    const architecture = await this.swarm.execute("generate tech architecture")

    const marketing = await this.swarm.execute("create marketing plan")

    const finance = await this.swarm.execute("create revenue model")

    return {
      idea: idea,
      research: research,
      product: product,
      architecture: architecture,
      marketing: marketing,
      finance: finance
    }

  }

}
