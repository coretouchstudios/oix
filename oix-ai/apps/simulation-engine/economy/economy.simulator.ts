export function simulateEconomy(){

 console.log("Modeling future economic scenarios")

 const economies = [
  "AI dominated service economy",
  "autonomous manufacturing economy",
  "fully digital global marketplace",
  "AI driven research economy"
 ]

 const scenario = economies[Math.floor(Math.random()*economies.length)]

 return {

  scenario,
  stabilityScore: Math.floor(Math.random()*100)

 }

}
