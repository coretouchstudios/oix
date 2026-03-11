import {AutonomousCore} from "../runtime/runtime"
import {learnFromUsage} from "../modelLearning/learning"

export class SelfImprovingPlatform{

core=new AutonomousCore()

record(event:any){

return learnFromUsage(event)

}

improve(){

return this.core.runEvolution()

}

}
