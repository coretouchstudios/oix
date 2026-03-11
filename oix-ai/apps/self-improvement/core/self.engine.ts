import { analyzeSystemPerformance } from "../analyzers/performance.analyzer"
import { optimizeAgents } from "../optimizers/agent.optimizer"
import { evolveArchitecture } from "../evolution/architecture.evolver"

export function runSelfImprovement(){

 const performance = analyzeSystemPerformance()

 const optimizations = optimizeAgents(performance.metrics)

 const evolution = evolveArchitecture()

 return {

  performance,
  optimizations,
  evolution

 }

}
