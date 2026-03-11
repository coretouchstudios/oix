export function investCapital(){

 console.log("Allocating venture capital")

 const sectors = [
  "AI software startups",
  "robotics companies",
  "climate technology ventures",
  "digital healthcare platforms"
 ]

 const sector = sectors[Math.floor(Math.random()*sectors.length)]

 return {

  sector,
  investment: Math.floor(Math.random()*200000)

 }

}
