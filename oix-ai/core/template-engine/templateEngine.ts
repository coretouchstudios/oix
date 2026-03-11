export class TemplateEngine {

 async selectTemplates(architecture:any){

  return {
   frontendTemplate:'saas-dashboard',
   backendTemplate:'node-api',
   databaseTemplate:'postgres-schema'
  }

 }

}
