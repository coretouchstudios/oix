export async function executeTool(tool, input) {

  console.log("Executing tool:", tool);

  return {
    tool,
    result: "tool executed"
  };

}