import { deployStartup } from "../core/deployment.executor"
import { registerDeployment,listDeployments } from "./deployment.registry"

export function createDeployment(startupId:string){

 const result = deployStartup(startupId)

 return registerDeployment({
  id:Date.now().toString(),
  startupId,
  environment:"production",
  status:result.status
 })

}

export function getDeployments(){

 return listDeployments()

}
