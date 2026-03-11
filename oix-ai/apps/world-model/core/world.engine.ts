import { analyzeMarkets } from "../markets/market.intelligence"
import { analyzeCompanies } from "../companies/company.intelligence"
import { mapTechnologies } from "../technology/technology.map"
import { modelEconomy } from "../economy/economy.model"

export function buildWorldModel(){

 const markets = analyzeMarkets()
 const companies = analyzeCompanies()
 const technology = mapTechnologies()
 const economy = modelEconomy()

 return {

  markets,
  companies,
  technology,
  economy

 }

}
