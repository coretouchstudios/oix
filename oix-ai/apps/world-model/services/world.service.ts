import { buildWorldModel } from "../core/world.engine"

export function generateWorldState(){

 const world = buildWorldModel()

 return {

  id:Date.now().toString(),
  world,
  timestamp:Date.now()

 }

}
