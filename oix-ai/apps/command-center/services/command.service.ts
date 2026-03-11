import { runCommandCenter } from "../core/command.engine"

export function getCommandCenterData(){

 const data = runCommandCenter()

 return {

  id:Date.now().toString(),
  system:data,
  timestamp:Date.now()

 }

}
