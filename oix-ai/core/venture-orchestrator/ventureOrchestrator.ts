import { StartupFactory } from '../../backend/startup-factory/startupFactory'

export class VentureOrchestrator {

 factory = new StartupFactory()

 async launch(rankedIdeas:any){

  console.log('Selecting best venture')

  const bestIdea = rankedIdeas[0]

  const startup = await this.factory.buildStartup(bestIdea.idea)

  return {
   selectedIdea:bestIdea,
   startup
  }

 }

}
