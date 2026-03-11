import { runStartupFactory } from "../core/orchestrator.engine"

export async function launchFactory(){

 const result = await runStartupFactory()

 return result

}
