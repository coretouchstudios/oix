import { publishItem, listItems } from "../services/marketplace.service"

export function createItem(req:any,res:any){

 const item = publishItem(req.body)

 res.json(item)

}

export function getItems(req:any,res:any){

 const items = listItems()

 res.json(items)

}
