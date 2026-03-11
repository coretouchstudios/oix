import { IdeaGenerator } from "./ideaGenerator"
import { ArchitectureDesigner } from "./architectureDesigner"
import { StrategyGenerator } from "../strategies/strategyGenerator"
import { VenturePlan } from "../types/venturePlan"

export class VentureBuilder {

 ideaGen = new IdeaGenerator()

 architect = new ArchitectureDesigner()

 strategyGen = new StrategyGenerator()

 build():VenturePlan{

  const idea = this.ideaGen.generateIdea()

  const architecture = this.architect.design(idea)

  const strategy = this.strategyGen.generate(idea)

  return {

   idea,

   architecture,

   strategy

  }

 }

}
