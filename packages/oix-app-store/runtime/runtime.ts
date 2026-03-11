import {listListings} from "../store/storeRegistry"

export class AppStoreRuntime{

install(id:string){

const item=listListings().find((l:any)=>l.id===id)

if(!item) throw new Error("not found")

return{
installed:item.id
}

}

}
