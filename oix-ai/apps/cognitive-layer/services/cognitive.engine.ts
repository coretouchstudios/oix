import { generateBusinessPlan } from "../planning/planning.agent"
import { runMarketResearch } from "../research/research.agent"
import { designProduct } from "../design/design.agent"
import { generateCode } from "../coding/coding.agent"

export function runCognitivePipeline(idea:string){

 const plan = generateBusinessPlan(idea)

 const research = runMarketResearch(idea)

 const design = designProduct(idea)

 const code = generateCode(design)

 return {

  idea,
  plan,
  research,
  design,
  code

 }

}
