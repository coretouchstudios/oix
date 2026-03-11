let usage:any={}

export function recordUsage(user:string,amount:number){

if(!usage[user]) usage[user]=0

usage[user]+=amount

}

export function getUsage(user:string){

return usage[user] || 0

}
