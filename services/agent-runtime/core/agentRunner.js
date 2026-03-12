import { planTask } from "./planner.js";
import { executeTool } from "./toolExecutor.js";

export async function runAgent(input){

  const plan = await planTask(input);

  const result = await executeTool(plan);

  return {
    success:true,
    plan,
    result
  };

}