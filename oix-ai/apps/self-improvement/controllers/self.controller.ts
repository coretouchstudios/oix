import { improveSystem } from "../services/self.service"

export function improve(req:any,res:any){

 const report = improveSystem()

 res.json(report)

}
