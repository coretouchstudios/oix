import {recordUsage} from "../usage/usageTracker"

let balance:any={}

export function bill(user:string,cost:number){

if(!balance[user]) balance[user]=0

balance[user]+=cost

recordUsage(user,cost)

return {
user,
charged:cost
}

}

export function getBill(user:string){

return balance[user] || 0

}
