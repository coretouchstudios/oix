export function allocateCapital(venture:any){

 console.log("Allocating capital to:",venture.name)

 const allocation = Math.floor(Math.random()*100000)+50000

 return {
  allocated:allocation,
  currency:"USD"
 }

}
