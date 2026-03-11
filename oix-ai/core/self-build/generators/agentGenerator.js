import fs from "fs"

export function generateAgent(name) {

  const code = `
export default {

  name: "${name}-agent",

  async execute(task) {

    return {
      agent: "${name}",
      task: task
    }

  }

}
`

  fs.writeFileSync(`agents/${name}Agent.js`, code)

  return "Agent created"

}
