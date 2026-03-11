export function makeInvestmentDecision(venture:any){

 console.log("Evaluating venture:",venture.name)

 const score = Math.random()

 if(score > 0.6){

  return {
   decision:"approve",
   confidence:score
  }

 }

 return {
  decision:"reject",
  confidence:score
 }

}
