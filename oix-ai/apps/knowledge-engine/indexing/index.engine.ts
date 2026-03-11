export function indexKnowledge(items:any){

 console.log("Indexing global knowledge")

 return items.map((item:any)=>({

  ...item,
  indexed:true

 }))

}
