import { BaseAgent } from "../core/baseAgent"

export class AgentRegistry {

  private agents:Map<string,BaseAgent> = new Map()

  register(agent:BaseAgent){
    this.agents.set(agent.name,agent)
  }

  get(name:string){
    return this.agents.get(name)
  }

  list(){
    return Array.from(this.agents.keys())
  }

}
