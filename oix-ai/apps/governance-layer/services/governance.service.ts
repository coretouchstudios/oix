import { runGovernance } from "../core/governance.engine"

export function evaluateVenture(venture:any){

 const result = runGovernance(venture)

 return {
  id:Date.now().toString(),
  venture,
  result,
  timestamp:Date.now()
 }

}
