import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "scraping-node6",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "scraping-node6",
      category: "scraping",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
