class Agent {

  constructor(name){
    this.name = name
  }

  async execute(task){

    return {
      agent:this.name,
      result:`completed task: ${task}`
    }

  }

}

module.exports = Agent