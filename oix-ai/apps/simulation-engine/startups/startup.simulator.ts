export function testStartupIdea(){

 console.log("Testing startup concept viability")

 const ideas = [
  "AI legal assistant platform",
  "Autonomous drone logistics",
  "AI climate forecasting SaaS",
  "Decentralized digital identity platform"
 ]

 const idea = ideas[Math.floor(Math.random()*ideas.length)]

 return {

  idea,
  successProbability: Math.floor(Math.random()*100)+"%"

 }

}
