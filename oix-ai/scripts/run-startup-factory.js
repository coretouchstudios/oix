import { runFactory } from "../services/startup-factory/pipeline/factoryPipeline.js"

async function main() {

  const result = await runFactory("AI SaaS marketing platform")

  console.log(JSON.stringify(result, null, 2))

}

main()
