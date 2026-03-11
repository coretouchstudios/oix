import { orchestrate } from "../services/orchestrator.service"

export function run(req:any,res:any){

 const result = orchestrate()

 res.json(result)

}
