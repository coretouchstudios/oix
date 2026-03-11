export function mapTechnologies(){

 console.log("Mapping emerging technologies")

 const technologies = [
  "general autonomous agents",
  "quantum accelerated AI",
  "AI designed pharmaceuticals",
  "fully automated manufacturing"
 ]

 const technology = technologies[Math.floor(Math.random()*technologies.length)]

 return {

  technology,
  maturityLevel:"emerging"

 }

}
