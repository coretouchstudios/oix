export function simulateMarket(){

 console.log("Simulating global market dynamics")

 const markets = [
  "AI SaaS market expansion",
  "Autonomous robotics adoption",
  "Climate tech investment boom",
  "Digital health platform surge"
 ]

 const scenario = markets[Math.floor(Math.random()*markets.length)]

 return {

  scenario,
  predictedGrowth: Math.floor(Math.random()*200)+"%"

 }

}
