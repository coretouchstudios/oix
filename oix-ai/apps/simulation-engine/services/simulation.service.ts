import { runSimulation } from "../core/simulation.engine"

export function generateSimulationReport(){

 const data = runSimulation()

 return {

  id:Date.now().toString(),
  simulation:data,
  timestamp:Date.now()

 }

}
