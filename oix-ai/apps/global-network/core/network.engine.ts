import { getNodes } from "../nodes/node.registry"
import { coordinateEconomy } from "../coordination/economic.coordinator"

export function runGlobalNetwork(){

 const nodes = getNodes()

 const coordination = coordinateEconomy(nodes)

 return {

  nodes,
  coordination

 }

}
