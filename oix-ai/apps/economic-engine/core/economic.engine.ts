import { generateRevenue } from "../revenue/revenue.generator"
import { reinvestProfits } from "../reinvestment/reinvestment.engine"

export function runEconomicEngine(){

 const revenue = generateRevenue()

 const reinvestment = reinvestProfits(revenue)

 return {

  revenue,
  reinvestment

 }

}
