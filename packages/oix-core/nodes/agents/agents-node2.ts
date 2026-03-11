import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "agents-node2",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "agents-node2",
      category: "agents",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
