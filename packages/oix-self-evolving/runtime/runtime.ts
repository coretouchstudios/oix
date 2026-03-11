import {generateAgent} from "../agentFactory/agentFactory"
import {evolveSystem} from "../evolution/evolution"
import {computeMetrics} from "../metrics/metrics"

export class AutonomousCore{

system:any={
agents:[],
workflows:[]
}

createAgent(spec:any){

const agent=generateAgent(spec)

this.system.agents.push(agent)

return agent

}

runEvolution(){

this.system=evolveSystem(this.system)

return computeMetrics(this.system)

}

}
