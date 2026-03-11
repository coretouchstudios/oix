import { GrowthAgent } from '../../agents/growth-agent/growthAgent'
import { MarketingAgent } from '../../agents/marketing-agent/marketingAgent'
import { AnalyticsAgent } from '../../agents/analytics-agent/analyticsAgent'
import { ProductAgent } from '../../agents/product-agent/productAgent'
import { BusinessAgent } from '../../agents/business-agent/businessAgent'

export class StartupOrchestrator {

 growth = new GrowthAgent()
 marketing = new MarketingAgent()
 analytics = new AnalyticsAgent()
 product = new ProductAgent()
 business = new BusinessAgent()

 async execute(features:any){

  console.log('Executing startup build')

  return {
   product: await this.product.run(features),
   marketing: await this.marketing.run(),
   growth: await this.growth.run(),
   analytics: await this.analytics.run(),
   business: await this.business.run()
  }

 }

}
