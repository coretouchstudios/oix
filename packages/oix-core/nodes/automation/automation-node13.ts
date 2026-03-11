import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "automation-node13",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "automation-node13",
      category: "automation",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
