import { Deployment } from "../models/deployment.model"

const deployments:Deployment[] = []

export function registerDeployment(deployment:Deployment){

 deployments.push(deployment)

 return deployment

}

export function listDeployments(){

 return deployments

}
