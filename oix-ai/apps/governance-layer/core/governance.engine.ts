import { makeInvestmentDecision } from "../decision/decision.engine"
import { evaluateRisk } from "../risk/risk.engine"
import { allocateCapital } from "../capital/capital.engine"
import { addVenture } from "../portfolio/portfolio.manager"

export function runGovernance(venture:any){

 const decision = makeInvestmentDecision(venture)

 if(decision.decision === "reject"){

  return {
   status:"rejected",
   reason:"low opportunity score"
  }

 }

 const risk = evaluateRisk(venture)

 const capital = allocateCapital(venture)

 const portfolio = addVenture({
  ...venture,
  capital,
  risk
 })

 return {

  status:"approved",
  risk,
  capital,
  portfolio

 }

}
