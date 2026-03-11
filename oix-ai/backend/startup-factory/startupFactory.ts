import { ProductManagerAI } from '../../core/product-manager-ai/productManagerAI'
import { MarketResearchAI } from '../../core/market-research-ai/marketResearchAI'
import { FeaturePlanner } from '../../core/feature-planner/featurePlanner'
import { StartupOrchestrator } from '../../core/startup-orchestrator/startupOrchestrator'

export class StartupFactory {

 productManager = new ProductManagerAI()
 research = new MarketResearchAI()
 planner = new FeaturePlanner()
 orchestrator = new StartupOrchestrator()

 async buildStartup(idea:string){

  console.log('Launching startup factory pipeline')

  const product = await this.productManager.defineProduct(idea)

  const research = await this.research.analyze(product)

  const features = await this.planner.plan(product,research)

  const build = await this.orchestrator.execute(features)

  return {
   product,
   research,
   features,
   build
  }

 }

}
