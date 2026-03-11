export function executeTrade(){

 console.log("Executing economic trade")

 const assets = [
  "AI services",
  "data insights",
  "automation tools",
  "digital infrastructure"
 ]

 const asset = assets[Math.floor(Math.random()*assets.length)]

 return {

  asset,
  tradeValue: Math.floor(Math.random()*50000)

 }

}
