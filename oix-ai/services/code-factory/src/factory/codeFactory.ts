import { ProjectGenerator } from "../generators/projectGenerator"
import { CodeProject } from "../types/codeProject"

export class CodeFactory {

 generator = new ProjectGenerator()

 createAPI(name:string):CodeProject{

  return this.generator.generateAPI(name)

 }

}
