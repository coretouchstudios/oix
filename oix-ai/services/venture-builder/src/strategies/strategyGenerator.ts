import { VentureIdea } from "../types/ventureIdea"

export class StrategyGenerator {

 generate(idea:VentureIdea){

  return `
Target Market: ${idea.market}

Launch Strategy:
- Early adopter beta
- AI community outreach
- SaaS subscription model
`

 }

}
