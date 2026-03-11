export class SystemDesigner {

 async design(analysis:any){

  console.log('Designing system architecture')

  return {
   architecture:'microservices',
   services:[
    'auth-service',
    'api-gateway',
    'ai-service',
    'project-service'
   ]
  }

 }

}
