import { analyzeSystem } from "../analysis/system.analysis"
import { optimizeComponent } from "../optimization/optimizer.engine"
import { evolveArchitecture } from "../architecture/evolution.engine"

export function runEvolution(){

 const analysis = analyzeSystem()

 const optimization = optimizeComponent(analysis)

 const evolution = evolveArchitecture(optimization)

 return {

  analysis,
  optimization,
  evolution

 }

}
