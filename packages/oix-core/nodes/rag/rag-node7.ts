import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "rag-node7",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "rag-node7",
      category: "rag",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
