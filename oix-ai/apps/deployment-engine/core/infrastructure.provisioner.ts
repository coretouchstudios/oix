export function provisionInfrastructure(startupId:string){

 console.log("Provisioning infrastructure for:",startupId)

 return {
  server:"cloud-instance",
  status:"ready"
 }

}
