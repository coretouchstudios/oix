export function generateRevenue(){

 console.log("Generating AI economy revenue")

 const sources = [
  "AI SaaS subscription revenue",
  "data intelligence services",
  "AI consulting automation",
  "autonomous digital product sales"
 ]

 const source = sources[Math.floor(Math.random()*sources.length)]

 return {

  source,
  revenue: Math.floor(Math.random()*100000)

 }

}
