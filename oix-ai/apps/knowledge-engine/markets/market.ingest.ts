export function ingestMarkets(){

 console.log("Gathering global market intelligence")

 const markets = [
  "AI SaaS expansion",
  "robotics automation growth",
  "climate tech investment",
  "digital healthcare platforms"
 ]

 const market = markets[Math.floor(Math.random()*markets.length)]

 return {

  title:market,
  source:"global market data",
  relevance:Math.floor(Math.random()*100)

 }

}
