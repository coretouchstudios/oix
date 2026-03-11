import { createNode } from "../../sdk/createNode"

export default createNode({
  type: "scraping-node8",

  inputs: ["input"],

  outputs: ["output"],

  async run({input,context}:any){

    // OIX AI Node Runtime

    const result = {
      node: "scraping-node8",
      category: "scraping",
      input,
      timestamp: Date.now()
    }

    return result
  }
})
