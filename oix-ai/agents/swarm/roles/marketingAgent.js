export default {

  name: "marketing-agent",

  async execute(goal) {

    return {
      marketing: "Create marketing strategy",
      goal: goal
    }

  }

}
