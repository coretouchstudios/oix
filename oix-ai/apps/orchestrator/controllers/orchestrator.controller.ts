import { launchFactory } from "../services/orchestrator.service"

export async function run(req:any,res:any){

 const result = await launchFactory()

 res.json(result)

}
