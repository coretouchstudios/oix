import { DeploymentRegistry } from "../registry/deploymentRegistry"
import { DeploymentRequest } from "../types/deploymentRequest"
import { DeploymentResult } from "../types/deploymentResult"
import { MockDeploymentProvider } from "../providers/mockDeploymentProvider"

export class DeploymentEngine {

 registry = new DeploymentRegistry()

 constructor(){

  this.registry.register("mock",new MockDeploymentProvider())

 }

 async deploy(request:DeploymentRequest):Promise<DeploymentResult>{

  const provider = this.registry.get("mock")

  if(!provider){

   throw new Error("No deployment provider available")

  }

  return provider.deploy(request)

 }

}
