import { generateSimulationReport } from "../services/simulation.service"

export function simulate(req:any,res:any){

 const report = generateSimulationReport()

 res.json(report)

}
