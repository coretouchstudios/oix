import { runEconomy } from "../core/economy.engine"

export function generateEconomicState(){

 const economy = runEconomy()

 return {

  id:Date.now().toString(),
  economy,
  timestamp:Date.now()

 }

}
