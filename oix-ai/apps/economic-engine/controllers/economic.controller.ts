import { generateEconomicReport } from "../services/economic.service"

export function report(req:any,res:any){

 const report = generateEconomicReport()

 res.json(report)

}
