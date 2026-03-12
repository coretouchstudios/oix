async function runAgent(input){

  const task = input.task || "no task"

  return {
    success: true,
    message: "Agent executed successfully",
    task: task
  }

}

module.exports = { runAgent }