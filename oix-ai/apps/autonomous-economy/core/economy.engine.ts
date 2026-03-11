import { generateRevenue } from "../revenue/revenue.engine"
import { executeTrade } from "../trading/trading.engine"
import { investCapital } from "../investment/investment.engine"
import { manageTreasury } from "../treasury/treasury.engine"

export function runEconomy(){

 const revenue = generateRevenue()
 const trade = executeTrade()
 const investment = investCapital()
 const treasury = manageTreasury()

 return {

  revenue,
  trade,
  investment,
  treasury

 }

}
