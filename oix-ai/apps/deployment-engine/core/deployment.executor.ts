import { buildDockerImage } from "./docker.builder"
import { provisionInfrastructure } from "./infrastructure.provisioner"

export function deployStartup(startupId:string){

 const image = buildDockerImage(startupId)

 const infra = provisionInfrastructure(startupId)

 console.log("Deploying startup:",startupId)

 return {
  image,
  infra,
  status:"deployed"
 }

}
