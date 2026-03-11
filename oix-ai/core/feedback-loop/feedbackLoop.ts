import { SelfImprovingEngine } from '../../backend/self-improving-engine/selfImprovingEngine'

export class FeedbackLoop {

 engine = new SelfImprovingEngine()

 async run(project:any){

  console.log('Running self-improvement loop')

  return await this.engine.improve(project)

 }

}
