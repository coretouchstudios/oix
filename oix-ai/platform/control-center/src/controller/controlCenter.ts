import { SystemRegistry } from "../registry/systemRegistry"

export class ControlCenter {

 registry = new SystemRegistry()

 constructor(){

  this.registry.register("ai-engine")
  this.registry.register("agent-framework")
  this.registry.register("agent-orchestrator")
  this.registry.register("venture-builder")
  this.registry.register("code-factory")
  this.registry.register("deployment-engine")

 }

 getSystems(){

  return this.registry.list()

 }

}
