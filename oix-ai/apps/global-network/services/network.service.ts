import { runGlobalNetwork } from "../core/network.engine"

export function getNetworkStatus(){

 const status = runGlobalNetwork()

 return {
  id:Date.now().toString(),
  network:status,
  timestamp:Date.now()
 }

}
