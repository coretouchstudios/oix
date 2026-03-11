export default {

  name: "executor-agent",

  canHandle(task) {
    return task.type === "execute"
  },

  async execute(task) {

    return {
      status: "executed",
      task: task
    }

  }

}
