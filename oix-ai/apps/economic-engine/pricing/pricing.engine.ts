export function calculatePricing(product:any){

 console.log("Calculating dynamic pricing")

 const basePrice = 29
 const multiplier = Math.random()*2

 return {
  price:Math.round(basePrice*multiplier),
  currency:"USD",
  strategy:"dynamic-demand"
 }

}
