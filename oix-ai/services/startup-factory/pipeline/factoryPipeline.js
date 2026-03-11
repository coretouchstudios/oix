import { runSwarm } from "../../../core/swarm-runtime/bootstrap.js"
import { StartupFactory } from "../engine/startupFactory.js"
import { generateFrontend } from "../generators/frontendGenerator.js"
import { generateBackend } from "../generators/backendGenerator.js"

async function runFactory(idea) {

  const swarm = {
    execute: runSwarm
  }

  const factory = new StartupFactory(swarm)

  const startup = await factory.createStartup(idea)

  const frontend = generateFrontend(startup)

  const backend = generateBackend(startup)

  return {
    startup: startup,
    frontend: frontend,
    backend: backend
  }

}

export { runFactory }
