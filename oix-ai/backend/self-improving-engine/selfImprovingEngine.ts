import { EvaluationEngine } from '../../core/evaluation-engine/evaluationEngine'
import { LearningSystem } from '../../core/learning-system/learningSystem'
import { ImprovementEngine } from '../../core/improvement-engine/improvementEngine'

export class SelfImprovingEngine {

 evaluator = new EvaluationEngine()
 learner = new LearningSystem()
 improver = new ImprovementEngine()

 async improve(project:any){

  console.log('Analyzing generated project')

  const evaluation = await this.evaluator.evaluate(project)

  const learning = await this.learner.learn(evaluation)

  const improvements = await this.improver.apply(learning)

  return improvements

 }

}
