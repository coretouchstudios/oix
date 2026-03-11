import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "rag-node12",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "rag-node12",
      category: "rag",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
