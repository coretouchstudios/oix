import {collectFeedback} from "../feedback/feedbackLoop"

export function learnFromUsage(event:any){

collectFeedback(event)

return {
learned:true,
event
}

}
