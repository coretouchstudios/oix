import { ArchitectureAnalyzer } from '../../core/architecture-analysis/analyzer'
import { SystemDesigner } from '../../core/system-design/systemDesigner'
import { StackSelector } from '../../core/stack-selection/stackSelector'
import { InfrastructurePlanner } from '../../core/infrastructure-planner/infrastructurePlanner'
import { DevOpsEngine } from '../../core/devops-engine/devopsEngine'

export class ArchitectureEngine {

 analyzer = new ArchitectureAnalyzer()
 designer = new SystemDesigner()
 stack = new StackSelector()
 infra = new InfrastructurePlanner()
 devops = new DevOpsEngine()

 async designSystem(goal:string){

  console.log('Analyzing architecture requirements')

  const analysis = await this.analyzer.analyze(goal)

  const systemDesign = await this.designer.design(analysis)

  const stack = await this.stack.select(systemDesign)

  const infrastructure = await this.infra.plan(stack)

  const devops = await this.devops.generate(infrastructure)

  return {
   analysis,
   systemDesign,
   stack,
   infrastructure,
   devops
  }

 }

}
