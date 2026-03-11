

class UsageTracker{

constructor(){

this.logs=[]

}

track(key,endpoint){

this.logs.push({

key,
endpoint,
time:Date.now()

})

}

getUsage(key){

return this.logs.filter(l=>l.key===key)

}

}

module.exports=UsageTracker


