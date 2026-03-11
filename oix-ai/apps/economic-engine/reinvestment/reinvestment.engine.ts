export function reinvestProfits(revenue:any){

 console.log("Reinvesting profits into ventures")

 const reinvestAmount = Math.floor(revenue.totalRevenue*0.4)

 return {
  reinvested:reinvestAmount,
  venturesFunded:Math.floor(reinvestAmount/50000)
 }

}
