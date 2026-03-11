import { generateKnowledgeState } from "../services/knowledge.service"

export function knowledge(req:any,res:any){

 const state = generateKnowledgeState()

 res.json(state)

}
