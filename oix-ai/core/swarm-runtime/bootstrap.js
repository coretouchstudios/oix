import { SwarmOrchestrator } from "./core/swarm-runtime/orchestrator/swarmOrchestrator.js"

import ceo from "./agents/swarm/roles/ceoAgent.js"
import research from "./agents/swarm/roles/researchAgent.js"
import developer from "./agents/swarm/roles/developerAgent.js"
import marketing from "./agents/swarm/roles/marketingAgent.js"
import finance from "./agents/swarm/roles/financeAgent.js"

const swarm = new SwarmOrchestrator()

swarm.register(ceo)
swarm.register(research)
swarm.register(developer)
swarm.register(marketing)
swarm.register(finance)

export async function runSwarm(goal) {

  return await swarm.execute(goal)

}
