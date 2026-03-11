import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "llm-node6",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "llm-node6",
      category: "llm",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
