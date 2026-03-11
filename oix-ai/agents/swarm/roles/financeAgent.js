export default {

  name: "finance-agent",

  async execute(goal) {

    return {
      finance: "Generate revenue model",
      goal: goal
    }

  }

}
