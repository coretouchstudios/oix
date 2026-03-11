import { DeploymentProvider } from "../providers/deploymentProvider"

export class DeploymentRegistry {

 private providers:Map<string,DeploymentProvider> = new Map()

 register(name:string,provider:DeploymentProvider){

  this.providers.set(name,provider)

 }

 get(name:string){

  return this.providers.get(name)

 }

}
