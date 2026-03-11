import { DeploymentProvider } from "./deploymentProvider"
import { DeploymentRequest } from "../types/deploymentRequest"
import { DeploymentResult } from "../types/deploymentResult"

export class MockDeploymentProvider implements DeploymentProvider {

 async deploy(request:DeploymentRequest):Promise<DeploymentResult>{

  return {

   deploymentId:request.id,

   status:"deployed",

   url:"http://localhost/"+request.projectName

  }

 }

}
