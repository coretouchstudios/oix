export function modelEconomy(){

 console.log("Modeling global economic systems")

 const economies = [
  "AI dominated service economy",
  "autonomous manufacturing economy",
  "fully digital marketplace",
  "AI driven research economy"
 ]

 const scenario = economies[Math.floor(Math.random()*economies.length)]

 return {

  scenario,
  stabilityScore:Math.floor(Math.random()*100)

 }

}
