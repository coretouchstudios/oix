export function manageTreasury(){

 console.log("Managing OIX treasury")

 return {

  totalAssets: Math.floor(Math.random()*10000000),
  liquidCapital: Math.floor(Math.random()*5000000),
  reinvestmentRate: 0.65

 }

}
