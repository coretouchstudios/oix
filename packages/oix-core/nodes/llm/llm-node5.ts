import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "llm-node5",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "llm-node5",
      category: "llm",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
