import { MarketplaceStore } from "../store/marketplaceStore"
import { MarketplaceItem } from "../types/marketplaceItem"

export class MarketplaceService {

 store = new MarketplaceStore()

 publishAgent(name:string){

  const item:MarketplaceItem = {

   id:Date.now().toString(),

   name,

   type:"agent",

   description:"AI agent available in OIX marketplace",

   creator:"OIX",

   createdAt:Date.now()

  }

  this.store.publish(item)

 }

 list(){

  return this.store.getItems()

 }

}
