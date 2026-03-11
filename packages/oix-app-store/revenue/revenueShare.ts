let revenue:any[]=[]

export function recordRevenue(dev:string,amount:number){
revenue.push({dev,amount})
}

export function getRevenue(dev:string){
return revenue.filter((r:any)=>r.dev===dev)
}
