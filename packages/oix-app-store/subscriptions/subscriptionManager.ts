let subscriptions:any[]=[]

export function createSubscription(user:string,plan:string){
const sub={
id:"sub-"+Date.now(),
user,
plan
}
subscriptions.push(sub)
return sub
}

export function listSubscriptions(){
return subscriptions
}
