import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "memory-node8",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "memory-node8",
      category: "memory",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
