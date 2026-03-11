export function buildDockerImage(startupId:string){

 console.log("Building Docker image for:",startupId)

 return {
  image:`oix/${startupId}:latest`
 }

}
