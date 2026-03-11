import { evolve } from "../services/evolution.service"

export function evolveSystem(req:any,res:any){

 const result = evolve()

 res.json(result)

}
