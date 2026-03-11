import { buildKnowledgeBase } from "../core/knowledge.engine"

export function generateKnowledgeState(){

 const knowledge = buildKnowledgeBase()

 return {

  id:Date.now().toString(),
  knowledge,
  timestamp:Date.now()

 }

}
