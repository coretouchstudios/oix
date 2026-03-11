export default {

  name: "general-agent",

  canHandle(task) {
    return true
  },

  async execute(task) {

    return {
      message: "Task processed",
      task: task
    }

  }

}
