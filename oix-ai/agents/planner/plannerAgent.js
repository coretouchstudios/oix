export default {

  name: "planner-agent",

  canHandle(task) {
    return task.type === "planning"
  },

  async execute(task) {

    return {
      plan: [
        "analyze goal",
        "break into steps",
        "assign agents"
      ]
    }

  }

}
