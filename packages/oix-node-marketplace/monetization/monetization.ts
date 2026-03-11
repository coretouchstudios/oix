let earnings:any={}

export function purchaseNode(node:string,user:string,price:number){

if(!earnings[node]) earnings[node]=0

earnings[node]+=price

return {
status:"purchased",
node,
user
}

}

export function getRevenue(node:string){

return earnings[node] || 0

}
