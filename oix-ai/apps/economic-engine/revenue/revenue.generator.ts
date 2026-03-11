export function generateRevenue(){

 console.log("Calculating SaaS revenue")

 const revenue = Math.floor(Math.random()*500000)+10000

 return {
  totalRevenue:revenue,
  currency:"USD"
 }

}
