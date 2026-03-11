import { runEconomicEngine } from "../core/economic.engine"

export function generateEconomicReport(){

 const data = runEconomicEngine()

 return {
  id:Date.now().toString(),
  revenue:data.revenue.totalRevenue,
  reinvested:data.reinvestment.reinvested,
  venturesFunded:data.reinvestment.venturesFunded,
  timestamp:Date.now()
 }

}
