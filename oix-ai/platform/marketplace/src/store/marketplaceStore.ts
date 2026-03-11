import { MarketplaceRegistry } from "../registry/marketplaceRegistry"
import { MarketplaceItem } from "../types/marketplaceItem"

export class MarketplaceStore {

 registry = new MarketplaceRegistry()

 publish(item:MarketplaceItem){

  this.registry.add(item)

 }

 getItems(){

  return this.registry.list()

 }

}
