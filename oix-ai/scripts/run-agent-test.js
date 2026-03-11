import { runAgent } from "../core/agent-runtime/bootstrap.js"

async function main() {

  const result = await runAgent({
    type: "planning",
    goal: "build ai startup"
  })

  console.log(result)

}

main()
