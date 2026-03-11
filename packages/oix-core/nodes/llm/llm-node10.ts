import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "llm-node10",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "llm-node10",
      category: "llm",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
