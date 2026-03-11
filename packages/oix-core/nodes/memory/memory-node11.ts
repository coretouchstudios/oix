import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "memory-node11",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "memory-node11",
      category: "memory",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
