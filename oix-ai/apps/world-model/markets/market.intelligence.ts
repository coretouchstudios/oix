export function analyzeMarkets(){

 console.log("Analyzing global markets")

 const markets = [
  "AI SaaS market",
  "Climate technology sector",
  "Autonomous robotics industry",
  "Digital healthcare platforms"
 ]

 const market = markets[Math.floor(Math.random()*markets.length)]

 return {

  market,
  trend:"rapid growth",
  opportunityScore: Math.floor(Math.random()*100)

 }

}
