import { generateEconomicState } from "../services/economy.service"

export function economy(req:any,res:any){

 const state = generateEconomicState()

 res.json(state)

}
