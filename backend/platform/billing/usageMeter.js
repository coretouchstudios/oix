let usage=[]

function track(apiKey,endpoint,tokens){
usage.push({apiKey,endpoint,tokens,timestamp:Date.now()})
}

function getUsage(apiKey){
return usage.filter(u=>u.apiKey===apiKey)
}

module.exports={track,getUsage}
