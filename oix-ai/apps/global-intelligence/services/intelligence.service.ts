import { runGlobalScan } from "../core/intelligence.engine"

export function generateReport(){

 const data = runGlobalScan()

 return {
  id:Date.now().toString(),
  type:"global-intelligence",
  data,
  timestamp:Date.now()
 }

}
