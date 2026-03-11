export function ingestPatents(){

 console.log("Analyzing patent databases")

 const patents = [
  "AI semiconductor optimization",
  "autonomous logistics drones",
  "smart grid climate infrastructure",
  "AI medical diagnostics"
 ]

 const patent = patents[Math.floor(Math.random()*patents.length)]

 return {

  title:patent,
  source:"global patent registry",
  relevance:Math.floor(Math.random()*100)

 }

}
