import { inventTechnology } from "../invention/invention.engine"
import { generatePatent } from "../patents/patent.generator"
import { designAIModel } from "../models/ai.model.designer"
import { discoverScience } from "../science/science.engine"

export function runResearchLab(){

 const invention = inventTechnology()

 const patent = generatePatent(invention)

 const aiModel = designAIModel()

 const discovery = discoverScience()

 return {

  invention,
  patent,
  aiModel,
  discovery

 }

}
