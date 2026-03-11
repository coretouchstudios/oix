import fs from 'fs'
import path from 'path'

export class ProjectGenerator {

 async generateProject(code:any){

  for(const file of code.frontendFiles){

   const dir = path.dirname(file.path)

   fs.mkdirSync(dir,{recursive:true})

   fs.writeFileSync(file.path,file.content)

  }

  for(const file of code.backendFiles){

   const dir = path.dirname(file.path)

   fs.mkdirSync(dir,{recursive:true})

   fs.writeFileSync(file.path,file.content)

  }

  return {status:'project_created'}

 }

}
