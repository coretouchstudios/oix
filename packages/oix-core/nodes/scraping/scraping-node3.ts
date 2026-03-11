import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "scraping-node3",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "scraping-node3",
      category: "scraping",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
