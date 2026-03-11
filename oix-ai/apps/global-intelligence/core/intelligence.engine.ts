import { monitorMarkets } from "../collectors/market.monitor"
import { scanStartups } from "../collectors/startup.scanner"
import { trackTechTrends } from "../collectors/trend.tracker"
import { analyzeOpportunities } from "../analyzers/opportunity.analyzer"

export function runGlobalScan(){

 const markets = monitorMarkets()

 const startups = scanStartups()

 const trends = trackTechTrends()

 const analysis = analyzeOpportunities({
  markets,
  startups,
  trends
 })

 return {

  markets,
  startups,
  trends,
  analysis

 }

}
