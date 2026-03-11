export class AgentMemory {

  constructor() {
    this.memory = []
  }

  store(data) {
    this.memory.push(data)
  }

  getAll() {
    return this.memory
  }

}
