import { MarketplaceItem } from "../models/marketplaceItem.model"

const items:MarketplaceItem[] = []

export function publishItem(item:MarketplaceItem){

 items.push(item)

 return item

}

export function listItems(){

 return items

}

