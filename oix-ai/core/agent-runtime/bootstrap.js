import { Orchestrator } from "./core/agent-runtime/orchestrator/orchestrator.js"

import planner from "./agents/planner/plannerAgent.js"
import executor from "./agents/executor/executorAgent.js"
import general from "./agents/core/generalAgent.js"

const orchestrator = new Orchestrator()

orchestrator.register(planner)
orchestrator.register(executor)
orchestrator.register(general)

export async function runAgent(task) {

  return await orchestrator.run(task)

}
