import { generateResearchReport } from "../services/research.service"

export function research(req:any,res:any){

 const report = generateResearchReport()

 res.json(report)

}
