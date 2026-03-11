import { DeploymentRequest } from "../types/deploymentRequest"
import { DeploymentResult } from "../types/deploymentResult"

export interface DeploymentProvider {

 deploy(request:DeploymentRequest):Promise<DeploymentResult>

}
