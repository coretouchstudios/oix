import { SwarmCoordinator } from '../../core/swarm-coordinator/swarmCoordinator'
import { TaskDecomposer } from '../../core/task-decomposer/taskDecomposer'

export class SwarmEngine {

 coordinator = new SwarmCoordinator()
 decomposer = new TaskDecomposer()

 async execute(goal:string){

  console.log('Starting Swarm Execution')

  const tasks = await this.decomposer.breakdown(goal)

  const results = await this.coordinator.assign(tasks)

  return results

 }

}
