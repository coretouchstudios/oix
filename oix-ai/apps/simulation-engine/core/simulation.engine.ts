import { simulateMarket } from "../markets/market.simulator"
import { testStartupIdea } from "../startups/startup.simulator"
import { predictTechTrends } from "../trends/trend.predictor"
import { simulateEconomy } from "../economy/economy.simulator"

export function runSimulation(){

 const market = simulateMarket()
 const startup = testStartupIdea()
 const trend = predictTechTrends()
 const economy = simulateEconomy()

 return {

  market,
  startup,
  trend,
  economy

 }

}
