import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "llm-node3",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "llm-node3",
      category: "llm",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
