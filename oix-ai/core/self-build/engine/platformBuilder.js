export class PlatformBuilder {

  constructor() {
    this.services = []
    this.agents = []
  }

  registerService(service) {
    this.services.push(service)
  }

  registerAgent(agent) {
    this.agents.push(agent)
  }

  status() {
    return {
      services: this.services,
      agents: this.agents
    }
  }

}
