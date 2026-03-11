import { runSwarm } from "../core/swarm-runtime/bootstrap.js"

async function main() {

  const result = await runSwarm("build ai startup")

  console.log(JSON.stringify(result, null, 2))

}

main()
