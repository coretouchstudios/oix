import { generateReport } from "../services/intelligence.service"

export function scan(req:any,res:any){

 const report = generateReport()

 res.json(report)

}
