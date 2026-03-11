import { runOrchestrator } from "../core/orchestrator.engine"

export function orchestrate(){

 const system = runOrchestrator()

 return {

  id:Date.now().toString(),
  orchestration:system,
  timestamp:Date.now()

 }

}
