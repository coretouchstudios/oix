import {listListings} from "../store/storeRegistry"

export function marketplaceAPI(){
return {
listings:listListings()
}
}
