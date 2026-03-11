import { loadTemplate } from "../core/template.loader"

export function generateStartup(name:string,template:string){

 const templateData = loadTemplate(template)

 console.log("Generating startup:",name)

 return {
  name,
  template,
  components:templateData.components
 }

}
