export function predictTechTrends(){

 console.log("Predicting technology trends")

 const trends = [
  "general autonomous agents",
  "AI designed pharmaceuticals",
  "fully automated manufacturing",
  "quantum accelerated AI"
 ]

 const trend = trends[Math.floor(Math.random()*trends.length)]

 return {

  trend,
  timeframe:"5-10 years"

 }

}
