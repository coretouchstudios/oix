import { runResearchLab } from "../core/research.engine"

export function generateResearchReport(){

 const data = runResearchLab()

 return {

  id:Date.now().toString(),
  research:data,
  timestamp:Date.now()

 }

}
