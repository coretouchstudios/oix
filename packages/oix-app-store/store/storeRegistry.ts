let listings:any[]=[]

export function publishListing(item:any){
listings.push(item)
return item
}

export function listListings(){
return listings
}

export function getListing(id:string){
return listings.find((l:any)=>l.id===id)
}
