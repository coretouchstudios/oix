import {storeKnowledge} from "../knowledge/knowledgeBase"

export function learnFromExecution(goal:string,result:any){

storeKnowledge({
goal,
result,
time:Date.now()
})

}
