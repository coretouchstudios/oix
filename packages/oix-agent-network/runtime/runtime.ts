import {AgentRegistry} from "../agents/registry"
import {Swarm} from "../swarm/swarm"
import {distributedReason} from "../reasoning/distributedReasoning"

export class AgentRuntime{

registry=new AgentRegistry()

createSwarm(){

return new Swarm(this.registry.list())

}

async runDistributedTask(task:any){

const agents=this.registry.list()

return distributedReason(task,agents)

}

}
