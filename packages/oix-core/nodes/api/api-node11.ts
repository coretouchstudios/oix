import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "api-node11",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "api-node11",
      category: "api",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
