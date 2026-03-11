import { runEvolution } from "../core/evolution.core"

export function evolve(){

 const result = runEvolution()

 return {

  id:Date.now().toString(),
  evolution:result,
  timestamp:Date.now()

 }

}
