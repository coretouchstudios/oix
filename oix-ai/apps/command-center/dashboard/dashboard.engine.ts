export function generateDashboard(){

 console.log("Generating AI economy dashboard")

 return {

  activeVentures:Math.floor(Math.random()*50),
  nodesOnline:Math.floor(Math.random()*10),
  startupsGenerating:Math.floor(Math.random()*5),
  totalRevenue:Math.floor(Math.random()*1000000)

 }

}
