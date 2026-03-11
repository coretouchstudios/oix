export function evaluateRisk(venture:any){

 console.log("Evaluating risk for:",venture.name)

 const risks = [
  "market competition",
  "technology complexity",
  "capital requirements"
 ]

 return {
  level:"medium",
  risks
 }

}
