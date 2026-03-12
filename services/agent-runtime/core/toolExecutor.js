import { exampleTool } from "../tools/exampleTool.js";

export async function executeTool(plan){

  if(plan.action === "exampleTool"){
    return exampleTool(plan.payload);
  }

  return {error:"tool not found"};

}