import { MarketplaceItem } from "../types/marketplaceItem"

export class MarketplaceRegistry {

 private items:MarketplaceItem[] = []

 add(item:MarketplaceItem){

  this.items.push(item)

 }

 list(){

  return this.items

 }

}
