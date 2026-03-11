import { KnowledgeEngine } from '../../core/knowledge-engine/knowledgeEngine'
import { MarketScanner } from '../../core/market-scanner/marketScanner'
import { OpportunityDetector } from '../../core/opportunity-detector/opportunityDetector'
import { IdeaGenerator } from '../../core/idea-generator/ideaGenerator'
import { IdeaScorer } from '../../core/idea-scorer/ideaScorer'
import { VentureOrchestrator } from '../../core/venture-orchestrator/ventureOrchestrator'

export class VentureBuilderEngine {

 knowledge = new KnowledgeEngine()
 scanner = new MarketScanner()
 detector = new OpportunityDetector()
 generator = new IdeaGenerator()
 scorer = new IdeaScorer()
 orchestrator = new VentureOrchestrator()

 async run(){

  console.log('Running Venture Builder Engine')

  const knowledge = await this.knowledge.load()

  const signals = await this.scanner.scan(knowledge)

  const opportunities = await this.detector.detect(signals)

  const ideas = await this.generator.generate(opportunities)

  const ranked = await this.scorer.score(ideas)

  const venture = await this.orchestrator.launch(ranked)

  return venture

 }

}
