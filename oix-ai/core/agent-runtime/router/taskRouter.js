export class TaskRouter {

  route(task) {

    if (task.type === "startup") {
      return "startup-agent"
    }

    if (task.type === "research") {
      return "research-agent"
    }

    if (task.type === "automation") {
      return "automation-agent"
    }

    return "general-agent"

  }

}
