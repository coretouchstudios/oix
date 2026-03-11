import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "llm-node9",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "llm-node9",
      category: "llm",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
