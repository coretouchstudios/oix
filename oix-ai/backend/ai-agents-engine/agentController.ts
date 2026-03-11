import { PlannerAgent } from '../../agents/planner-agent/plannerAgent'
import { BuilderAgent } from '../../agents/builder-agent/builderAgent'
import { ResearchAgent } from '../../agents/research-agent/researchAgent'
import { TestAgent } from '../../agents/test-agent/testAgent'
import { DeployerAgent } from '../../agents/deployer-agent/deployerAgent'

export class AgentController {

 planner = new PlannerAgent()
 builder = new BuilderAgent()
 research = new ResearchAgent()
 tester = new TestAgent()
 deployer = new DeployerAgent()

 async executeGoal(goal:string){

  console.log('Agent System Goal:', goal)

  const plan = await this.planner.plan(goal)

  const research = await this.research.run(plan)

  const build = await this.builder.build(plan)

  const tests = await this.tester.test(build)

  const deploy = await this.deployer.deploy(build)

  return {
   plan,
   research,
   build,
   tests,
   deploy
  }

 }

}
