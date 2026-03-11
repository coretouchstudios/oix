import { ingestResearch } from "../research/research.ingest"
import { ingestPatents } from "../patents/patent.ingest"
import { ingestMarkets } from "../markets/market.ingest"
import { indexKnowledge } from "../indexing/index.engine"

export function buildKnowledgeBase(){

 const research = ingestResearch()
 const patents = ingestPatents()
 const markets = ingestMarkets()

 const knowledge = [research,patents,markets]

 const indexed = indexKnowledge(knowledge)

 return indexed

}
