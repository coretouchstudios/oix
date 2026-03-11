let feedback:any[]=[]

export function collectFeedback(event:any){

feedback.push(event)

}

export function getFeedback(){

return feedback

}
