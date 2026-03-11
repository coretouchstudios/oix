import { TemplateGenerator } from "../templates/templateGenerator"
import { CodeProject } from "../types/codeProject"

export class ProjectGenerator {

 templates = new TemplateGenerator()

 generateAPI(name:string):CodeProject{

  const files = this.templates.generateBasicAPI()

  return {

   id:Date.now().toString(),

   name,

   type:"api",

   files

  }

 }

}
