import { evaluateVenture } from "../services/governance.service"

export function evaluate(req:any,res:any){

 const venture = req.body

 const result = evaluateVenture(venture)

 res.json(result)

}
