import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "tools-node2",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "tools-node2",
      category: "tools",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
