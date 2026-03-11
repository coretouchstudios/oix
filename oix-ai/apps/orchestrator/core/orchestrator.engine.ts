import axios from "axios"
import { services } from "../services/service.registry"
import { generateStartupIdea } from "./idea.generator"

export async function runStartupFactory(){

 const idea = generateStartupIdea()

 console.log("Generated idea:",idea)

 // Create startup
 const startup = await axios.post(
  services.ventureBuilder + "/ventures/create",
  {name:idea,template:"ai-startup"}
 )

 console.log("Startup created:",startup.data)

 // Deploy startup
 const deployment = await axios.post(
  services.deploymentEngine + "/deployments/deploy",
  {startupId:startup.data.id}
 )

 console.log("Deployment result:",deployment.data)

 return {
  idea,
  startup:startup.data,
  deployment:deployment.data
 }

}
