import { getCommandCenterData } from "../services/command.service"

export function dashboard(req:any,res:any){

 const data = getCommandCenterData()

 res.json(data)

}
