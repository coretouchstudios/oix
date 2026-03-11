import { createDeployment,getDeployments } from "../services/deployment.service"

export function deploy(req:any,res:any){

 const {startupId} = req.body

 const deployment = createDeployment(startupId)

 res.json(deployment)

}

export function list(req:any,res:any){

 const deployments = getDeployments()

 res.json(deployments)

}
