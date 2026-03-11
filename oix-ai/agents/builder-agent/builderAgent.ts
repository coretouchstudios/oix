import { BuilderEngine } from '../../backend/builder-engine/builderEngine'

export class BuilderAgent {

 builder = new BuilderEngine()

 async build(plan:any){

  console.log('Builder Agent executing')

  const result = await this.builder.build('Generate application from plan')

  return result

 }

}
