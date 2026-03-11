import { generateWorldState } from "../services/world.service"

export function world(req:any,res:any){

 const state = generateWorldState()

 res.json(state)

}
